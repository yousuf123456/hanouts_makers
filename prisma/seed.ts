import prisma from "../app/_libs/prismadb";

async function main() {
  await prisma.order.updateMany({
    data: {
      customerDetails: {
        name: "Shairawat Hassan",
        image:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yb0tVWnJGM1RETUR0MXdVRUlJZ2R1RTFLdmoifQ",
        email: "shairawat@gmail.com",
      },
    },
  });

  await prisma.package.updateMany({
    data: {
      customerDetails: {
        name: "Shairawat Hassan",
        image:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yb0tVWnJGM1RETUR0MXdVRUlJZ2R1RTFLdmoifQ",
        email: "shairawat@gmail.com",
      },
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
