import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";

export const Hero = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 xl:py-48 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-16 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl text-gray-900 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Become a Vendor on Handouts
            </h1>

            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg lg:text-xl">
              Join our monochrome fashion marketplace and showcase your unique
              designs to fashion-forward customers.
            </p>
          </div>

          <div className="space-x-4">
            <SignedIn>
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "h-12 px-14",
                })}
                href={""}
              >
                Go To Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </SignedIn>

            <SignedOut>
              <SignUpButton>
                <Button size={"lg"} className="h-12 px-14">
                  Start Selling Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </section>
  );
};
