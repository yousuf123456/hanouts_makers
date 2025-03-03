import React from "react";

import prisma from "@/app/_libs/prismadb";
import { notFound } from "next/navigation";
import { getStatusPercentage } from "./utils";
import { OrderedProductCard } from "@/app/dashboard/_components/OrderedProductCard";

import {
  CheckCircle2,
  Package as PackageIcon,
  Store,
  Truck,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { clerkClient } from "@clerk/nextjs/server";
import { OrderedProduct, Package as PackageType } from "@prisma/client";

const getPackage = async (packageId: string) => {
  try {
    let pckg = (await prisma.package.findUnique({
      where: {
        id: packageId,
      },
      include: {
        orderedProducts: true,
        customer: {
          select: {
            authUserId: true,
          },
        },
      },
    })) as PackageType & {
      orderedProducts: OrderedProduct[];
      customer: {
        name?: string | null;
        authUserId: string;
        email?: string;
        image?: string;
      };
    };

    if (!pckg) return null;

    const customerDetails = await (
      await clerkClient()
    ).users.getUser(pckg.customer.authUserId);

    if (!customerDetails) return null;

    pckg.customer = {
      image: customerDetails.imageUrl,
      name: customerDetails.fullName,
      authUserId: pckg.customer.authUserId,
      email: customerDetails.primaryEmailAddress?.emailAddress,
    };

    return pckg;
  } catch (e) {
    return null;
  }
};

export const Package: React.FC<{ packageId: string }> = async ({
  packageId,
}) => {
  const pckg = await getPackage(packageId);

  if (!pckg) return notFound();

  console.log(pckg);
  return (
    <Card key={pckg.storeId} className="w-full">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="flex items-center text-sm font-semibold uppercase sm:text-base">
          <Store className="mr-2 h-5 w-5" />
          {pckg.orderedProducts[0].product.storeName}
        </CardTitle>

        <div className="flex items-center">
          {getStatusIcon(pckg.status)}
          <span className="ml-2 text-sm font-medium">{pckg.status}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-4">
        <Progress value={getStatusPercentage(pckg.status)} className="w-full" />

        {pckg.orderedProducts.map((orderedProduct, i) => (
          <OrderedProductCard
            hideStatus={orderedProduct.status === pckg.status}
            orderedProduct={orderedProduct}
            key={i}
          />
        ))}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">
            Subtotal: ${pckg.totalAmmount.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            Delivery Fee: ${pckg.delieveryFee.toFixed(2)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Processing":
      return <PackageIcon className="h-5 w-5" />;
    case "Shipped":
      return <Truck className="h-5 w-5" />;
    case "Delivered":
      return <CheckCircle2 className="h-5 w-5" />;
    default:
      return <PackageIcon className="h-5 w-5" />;
  }
};
