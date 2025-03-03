import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export const CTA = () => {
  return (
    <section className="w-full py-28 md:py-36 bg-gray-100">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tighter sm:text-3xl md:text-4xl">
            Have a Question?
          </h2>

          <p className="max-w-xl text-gray-500">
            We're here to help. Send us your query about becoming a vendor on
            Handouts.
          </p>

          <form className="mt-8 w-full max-w-md flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Type your question here"
              className="flex-grow"
              type="text"
              required
            />

            <Button
              type="submit"
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              Send
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <p className="text-sm text-gray-500">
            We'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
};
