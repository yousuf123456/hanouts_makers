import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(req: Request) {
  const { categoryId } = await req.json();

  const attributes = await prisma.attribute.findMany({
    where: {
      categoryIds: {
        has: categoryId,
      },
    },
  });

  return NextResponse.json(attributes);
}
