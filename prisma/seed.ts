import prisma from "../app/libs/prismadb";

async function main() {
  await prisma.attribute.updateMany({
    where: {
      select: true,
    },
    data: {
      multiSelect: true,
    },
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
