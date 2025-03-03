export {};

declare global {
  interface CustomJwtSessionClaims {
    dbVendorId: string;
    vendorStoreId: string;
  }
}
