import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUiProvider } from "./context/NextUiProvider";
import { SuperTokensProvider } from "./context/SuperTokensProvider";
import { ProtectedLayer } from "./context/ProtectedLayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SuperTokensProvider>
          <NextUiProvider>
            <ProtectedLayer>{children}</ProtectedLayer>
          </NextUiProvider>
        </SuperTokensProvider>
      </body>
    </html>
  );
}
