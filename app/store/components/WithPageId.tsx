import { redirect } from "next/navigation";
import React from "react";

interface WithPageIdProps {
  pageId: string;
  children: React.ReactNode;
}

export const WithPageId: React.FC<WithPageIdProps> = ({ pageId, children }) => {
  if (!pageId) return redirect("/store/pages");

  return <>{children}</>;
};
