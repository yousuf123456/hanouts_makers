import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, UserJSON, WebhookEvent } from "@clerk/nextjs/server";

import prisma from "@/app/_libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_KEY;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data as UserJSON;
  const eventType = evt.type;

  const client = await clerkClient();

  if (eventType === "user.created") {
    const vendor = await client.users.getUser(id!);

    const createdVendor = await prisma.vendor.create({
      data: {
        authVendorId: vendor.id,
      },
      select: {
        id: true,
      },
    });

    const createdStore = await prisma.store.create({
      data: {
        authVendorId: vendor.id,
        vendor: {
          connect: {
            id: createdVendor.id,
          },
        },
      },
    });

    await client.users.updateUserMetadata(vendor.id, {
      publicMetadata: {
        dbVendorId: createdVendor.id,
        vendorStoreId: createdStore.id,
      },
    });
  }

  if (eventType === "user.updated") {
    const vendor = await client.users.getUser(id!);

    const dbVendor = await prisma.vendor.update({
      where: {
        authVendorId: vendor.id,
      },
      data: {
        authVendorId: vendor.id,
      },
      select: {
        id: true,
      },
    });

    // userRecordCache.revalidate(dbUser.id);
  }

  if (eventType === "user.deleted") {
    const dbVendor = await prisma.vendor.findUnique({
      where: { authVendorId: id! },
      select: { id: true },
    });

    if (!dbVendor) return new NextResponse("Invalid Auth Vendor Id");

    const vendorStore = await prisma.store.delete({
      where: { vendorId: dbVendor?.id },
    });

    await prisma.vendor.delete({ where: { id: dbVendor.id } });

    // userRecordCache.revalidate(dbUser.id);
  }

  return new NextResponse("", { status: 200 });
}
