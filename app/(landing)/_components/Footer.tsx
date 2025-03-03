import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 py-6 w-full shrink-0 px-4 md:px-6 border-t border-gray-200">
      <div className="flex flex-col gap-2 sm:flex-row w-full items-center justify-between">
        <h2 className="uppercase font-medium text-gray-800">Handouts</h2>

        <nav className="flex gap-4">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Home
          </Link>

          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row w-full items-center">
        <p className="text-xs text-gray-500">
          © 2024 Handouts. All rights reserved.
        </p>

        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>

          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
};
