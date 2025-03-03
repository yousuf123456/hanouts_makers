import { auth } from "@clerk/nextjs/server";

export const userAuthentication = async () => {
  const { userId, sessionId, sessionClaims } = await auth();

  const isUserAuthenticated =
    userId !== null && sessionId !== null && sessionClaims.dbUserId !== null;

  return {
    authUserId: userId,
    dbVendorId: sessionClaims?.dbVendorId,
    isUserAuthenticated: isUserAuthenticated,
    vendorStoreId: sessionClaims?.vendorStoreId,
  };
};
