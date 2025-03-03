import { NextResponse } from "next/server";
import prisma from "../../_libs/prismadb";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return new NextResponse("Authorization Required", { status: 401 });
    }

    const currentVendor = await getCurrentVendor({
      userSTId: userId,
      getStore: true,
    });

    if (!currentVendor) {
      return new NextResponse("Vendor Data Not Found", { status: 404 });
    }

    const { searchTerm } = await req.json();
    const pipeline = [
      {
        $searchMeta: {
          index: "productsSearch",
          facet: {
            operator: {
              equals: {
                path: "storeId",
                value: { $oid: currentVendor.store?.id },
              },
            },

            facets: {
              colors: {
                type: "string",
                path: "attributes.colors",
              },
              brand: {
                type: "string",
                path: "attributes.brand",
              },
              sizes: {
                type: "string",
                path: "attributes.sizes",
              },
              category: {
                type: "string",
                path: "category",
              },
            },
          },
        },
      },
    ];

    const facetsData = (await prisma.product.aggregateRaw({
      pipeline: pipeline,
    })) as any;

    return NextResponse.json(facetsData);
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
