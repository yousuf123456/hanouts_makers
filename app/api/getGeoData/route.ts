import { NextResponse } from "next/server";

import prisma from "../../_libs/prismadb";
import { getServerSession } from "@/app/actions/getServerSession";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentVendor = await getCurrentVendor({
      getStore: true,
      userSTId: userSTId,
      getStoreFields: {
        id: true,
        getChartInfo: true,
      },
    });

    if (!currentVendor?.store) {
      return new NextResponse("Vendor Data Not Found", { status: 404 });
    }

    const currentDate = new Date();
    const refreshedAt = new Date(
      currentVendor.store.geoChartInfo?.refreshedAt || ""
    );

    const timeDifference =
      currentDate.getTime() - (refreshedAt.getTime() || new Date().getTime());

    const hoursDifference = timeDifference / (1000 * 60 * 60);

    const hoursDifferenceToNextRefresh = 24 - hoursDifference;

    var hours = Math.floor(hoursDifferenceToNextRefresh);
    var minutes = Math.round((hoursDifferenceToNextRefresh - hours) * 60);

    var formattedRefreshInTime;

    if (hours > 0) {
      formattedRefreshInTime = hours + " Hours " + minutes + " Minutes";
    } else {
      formattedRefreshInTime = minutes + " Minutes";
    }

    if (currentVendor.store.geoChartInfo && hoursDifference < 24) {
      return NextResponse.json({
        customersCountData: currentVendor.store.geoChartInfo.customersCountData,
        customersPerData: currentVendor.store.geoChartInfo.customersPerData,
        refreshIn: formattedRefreshInTime,
      });
    }

    const pipeline = [
      {
        $match: {
          $expr: {
            $in: [{ $oid: currentVendor.store?.id }, "$associatedStoreIds"],
          },
        },
      },
      {
        $group: {
          _id: "$boughtFromLocation",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          cityName: "$_id",
          numberOfCustomers: "$count",
        },
      },
    ];

    const customersData = (await prisma.order.aggregateRaw({
      pipeline: pipeline,
    })) as any;

    const structuredCustomersCountData: any = {};

    customersData.map(
      (data: any) =>
        (structuredCustomersCountData[data.cityName] = data.numberOfCustomers)
    );

    const structuredCustomersPerData: any = {};
    let totalCustomers: number = 0;

    Object.keys(structuredCustomersCountData).map((Key) => {
      totalCustomers += structuredCustomersCountData[Key];
    });

    Object.keys(structuredCustomersCountData).map((Key) => {
      structuredCustomersPerData[Key] =
        (structuredCustomersCountData[Key] / totalCustomers) * 100;
    });

    const geoChartInfo = {
      refreshedAt: currentDate,
      customersPerData: structuredCustomersPerData,
      customersCountData: structuredCustomersCountData,
    };

    await prisma.store.update({
      where: {
        id: currentVendor.store.id,
      },
      data: {
        geoChartInfo,
      },
    });

    return NextResponse.json({
      customersCountData: geoChartInfo.customersCountData,
      customersPerData: geoChartInfo.customersPerData,
      refreshIn: formattedRefreshInTime,
    });
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
