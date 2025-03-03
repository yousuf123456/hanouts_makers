import { CheckCircle, Package, Truck } from "lucide-react";
import React from "react";

export const Features = () => {
  return (
    <section className="w-full py-28 md:py-36 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl text-gray-900 font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
          Why Choose Handouts?
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-8 w-8 mb-4 text-gray-700" />
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-gray-500">
              We curate only the finest monochrome fashion pieces.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Truck className="h-8 w-8 mb-4 text-gray-700" />
            <h3 className="text-xl font-semibold mb-2">Easy Logistics</h3>
            <p className="text-gray-500">
              Simplified shipping and handling process for vendors.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Package className="h-8 w-8 mb-4 text-gray-700" />
            <h3 className="text-xl font-semibold mb-2">Wide Reach</h3>
            <p className="text-gray-500">
              Connect with fashion enthusiasts across the globe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
