import React from "react";
import { NewPassword } from "./components/NewPassword";
import { redirect } from "next/navigation";

interface SearchParams {
  rid?: string;
  error: string;
  token?: string;
  success?: string;
  tenantId?: string;
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const isSuccess = searchParams.success === "true";
  const isError = searchParams.error === "true";
  if (
    (!isSuccess && !isError) &&
    (!searchParams.rid || !searchParams.tenantId || !searchParams.token)
  ) {
    return redirect("/");
  }

  return <NewPassword isSuccess={isSuccess} isError={isError} />;
}
