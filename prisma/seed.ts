import prisma from "../app/libs/prismadb";

async function main() {
  //Updating vendors

  const vendors = await prisma.vendor.findMany({ take: 10 });

  vendors.map(async (vendor, i) => {
    await prisma.vendor.update({
      where: {
        id: vendor.id,
      },
      data: {
        superTokensUserId: String(i),
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
