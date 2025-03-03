import React from "react";

export const StepsToStart = () => {
  return (
    <section className="w-full py-28 md:py-36 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-gray-900 text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
          How It Works
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-500">
              Create your vendor account and set up your profile.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">List Your Products</h3>
            <p className="text-gray-500">
              Upload your monochrome fashion items with detailed descriptions.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
            <p className="text-gray-500">
              Receive orders and grow your fashion business with Handouts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
