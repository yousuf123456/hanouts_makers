import prisma from "@/app/_libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");
    if (!userSTId) return new NextResponse("Unauthorized", { status: 401 });

    const currentVendor = await getCurrentVendor({
      getStore: true,
      userSTId,
      getStoreFields: { id: true, name: true },
    });
    if (!currentVendor)
      return new NextResponse("Vendor Data Not Found", { status: 403 });

    const { data, isEditing, productId } = await req.json();

    if (isEditing) {
      const updatedProduct = await prisma.product.update({
        where: {
          id: productId,
        },
        data,
      });

      return NextResponse.json("Succesfully updated the product");
    }

    const createdProduct = await prisma.product.create({
      data: {
        ...data,
        superTokensUserId: userSTId,
        detailedRatingsCount: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        store: {
          connect: {
            id: currentVendor.store?.id,
          },
        },
        storeName: currentVendor.store?.name,
      },
    });

    return NextResponse.json("Succesfully created a new product");
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
