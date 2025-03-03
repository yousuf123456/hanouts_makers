import prisma from "../_libs/prismadb";

export const getPackageById = async (packageId: string) => {
  const Package = await prisma.package.findUnique({
    where: {
      id: packageId,
    },
    select: {
      status: true,
    },
  });

  return Package;
};
