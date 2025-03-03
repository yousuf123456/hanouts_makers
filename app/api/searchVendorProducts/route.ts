import prisma from "../../_libs/prismadb";

import { NextResponse } from "next/server";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { getFilterObjects } from "@/app/utils/getFilterObjects";

export interface IParams {
  category?: string[];
  colors?: string[];
  brand?: string[];
  sizes?: string[];
  price?: string;
  name?: string;
}

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId)
      return new NextResponse("Authorization Required", { status: 401 });

    const currentVendor = await getCurrentVendor({
      userSTId: userId,
      getStore: true,
    });
    if (!currentVendor)
      return new NextResponse("Vendor Data Not Found", { status: 404 });

    const { filters, limit }: { filters: IParams; limit: number } =
      await req.json();

    const filterArray = [];

    const {
      categoryObject,
      colorsObject,
      sizesObject,
      brandObject,
      priceObject,
    } = getFilterObjects(filters);

    if (filters.category) filterArray.push(categoryObject);
    if (filters.brand) filterArray.push(brandObject);
    if (filters.sizes) filterArray.push(sizesObject);
    if (filters.colors) filterArray.push(colorsObject);
    if (filters.price) filterArray.push(priceObject);

    const pipeline: any = [
      {
        $search: {
          index: "productsSearch",
          compound: {
            must: [
              {
                equals: {
                  value: { $oid: currentVendor.store?.id },
                  path: "storeId",
                },
              },
            ],
            ...(filters.name
              ? {
                  should: [
                    {
                      text: {
                        path: "name",
                        query: filters.name,
                        fuzzy: {
                          maxEdits: 1,
                        },
                      },
                    },
                  ],
                }
              : {}),
          },
        },
      },
      { $limit: limit },
      {
        $project: {
          SKU: 1,
          name: 1,
          image: 1,
          price: 1,
          quantity: 1,
        },
      },
    ];

    if (pipeline[0].$search?.compound)
      pipeline[0].$search.compound.filter = filterArray;

    const searchProducts = (await prisma.product.aggregateRaw({
      pipeline: pipeline,
    })) as any;

    return NextResponse.json(searchProducts);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
