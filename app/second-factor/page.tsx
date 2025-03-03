import React from "react";
import { EnterOTPForm } from "./components/EnterOTPForm";
import { OTPHeader } from "./components/OTPHeader";

export default async function page() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-6">
      <OTPHeader />
      <EnterOTPForm />
    </div>
  );
}
