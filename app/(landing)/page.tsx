import React from "react";
import { StepsToStart } from "./_components/StepsToStart";
import { CTA } from "./_components/CTA";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Hero />
      <Features />
      <StepsToStart />
      <CTA />
    </div>
  );
}
