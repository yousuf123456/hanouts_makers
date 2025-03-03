import React from "react";
import { AccountVerificationForm } from "./components/AccountVerificationForm";
import { Handouts } from "./components/Handouts";
import { getCurrentVendor } from "../actions/getCurrentVendor";
import { VendorType } from "../types";

export default async function AccountVerificationPage() {
  const currentVendor = await getCurrentVendor();

  return (
    <div className="flex max-h-screen flex-col gap-6 overflow-y-auto">
      <div className="px-16 py-8">
        <Handouts />
      </div>

      <AccountVerificationForm currentVendor={currentVendor as VendorType} />
    </div>
  );
}
