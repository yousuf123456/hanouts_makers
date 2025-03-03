import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";
import { routes } from "@/app/_config/routes";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-[999] px-4 lg:px-6 h-20 justify-between flex items-center border-b border-gray-200 bg-white">
      <Link className="flex items-center justify-center" href="#">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="relative h-8 w-12 lg:h-9 lg:w-16">
            <Image
              src="/logos/HandoutsLOGO.png"
              alt="Logo"
              className=" object-contain"
              fill
            />
          </div>

          <p
            className={
              "mt-1 hidden bg-gradient-to-br from-gray-900 via-gray-700 to-gray-200 bg-clip-text text-sm font-medium uppercase text-transparent sm:block sm:text-base"
            }
          >
            Handouts Makers
          </p>
        </div>
      </Link>

      <nav className="flex gap-4 sm:gap-6">
        <SignedOut>
          <SignUpButton>
            <Button>Create Account</Button>
          </SignUpButton>

          <SignInButton>
            <Button variant={"secondary"}>Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={routes.products}
            >
              Dashboard
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
};
