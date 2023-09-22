import { metadata } from "./../app/layout";
import prisma from "../app/libs/prismadb";

async function main() {
  //Updating vendors

  const allOrderedProducts = (await prisma.orderedProduct.findMany({
    select: { product: true },
  })) as any;
  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  allProducts.map(async (product) => {
    let salesCount = 0;
    
    allOrderedProducts.map((orderedProduct: any) => {
      if (orderedProduct.product.id === product.id) salesCount += 1;
    });

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        numOfSales: salesCount,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
