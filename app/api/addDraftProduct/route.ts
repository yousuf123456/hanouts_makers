import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import prisma from "../../_libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentVendor = await getCurrentVendor({
      getStore: true,
      userSTId: userSTId,
    });

    if (!currentVendor) {
      return new NextResponse("Vendor Data Not Found", { status: 404 });
    }

    const { draftProduct, updateDraftProduct, draftId } = await req.json();

    if (updateDraftProduct) {
      const updatedDraftProduct = await prisma.draftProduct.update({
        where: {
          id: draftId,
        },

        data: {
          ...draftProduct,
        },

        select: {
          id: true,
        },
      });

      return NextResponse.json(updatedDraftProduct.id);
    }

    const createdDraftProduct = await prisma.draftProduct.create({
      data: {
        ...draftProduct,
        store: {
          connect: {
            //@ts-ignore
            id: currentVendor.store.id,
          },
        },
      },

      select: {
        id: true,
      },
    });

    return NextResponse.json(createdDraftProduct.id);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
