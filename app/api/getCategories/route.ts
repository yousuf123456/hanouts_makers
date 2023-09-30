import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

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
      },
    },
  ];

  const categories = await prisma.category.aggregateRaw({
    pipeline: pipeline,
  });

  return NextResponse.json(categories);
}
