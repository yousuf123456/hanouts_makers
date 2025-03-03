import { NextResponse } from "next/server";
import prisma from "../../_libs/prismadb";
import { CategoryType } from "@/app/types";

export async function POST(req: Request) {
  const { parentId, getChilds } = await req.json();

  const pipeline = [
    {
      $match: {
        parentId: { ...(getChilds ? { $oid: parentId } : { $exists: false }) },
      },
    },
    {
      $lookup: {
        from: "Category",
        localField: "_id",
        foreignField: "parentId",
        as: "childs",
        pipeline: [
          {
            $limit: 1,
          },
        ],
      },
    },
    {
      $addFields: {
        hasChilds: { $ne: [{ $size: "$childs" }, 0] },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        hasChilds: 1,
        parentId: 1,
      },
    },
  ];

  const categories = (await prisma.category.aggregateRaw({
    pipeline: pipeline,
  })) as any;

  const prismaStructured = categories.map((category: any) => ({
    id: category._id.$oid,
    name: category.name,
    hasChilds: category.hasChilds,
    parentId: category.parentId ? category.parentId.$oid : null,
  }));

  return NextResponse.json(prismaStructured);
}
