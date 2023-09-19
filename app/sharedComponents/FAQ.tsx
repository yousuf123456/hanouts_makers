"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface FAQProps {
  questions: { question: string; answer: string | undefined }[];
}

export const FAQ: React.FC<FAQProps> = ({ questions }) => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="font-text text-xl font-semibold text-themeSecondary">
        Frequently Asked Questions
      </h3>

      <Accordion
        selectionMode="multiple"
        className="rounded-md border-[1px] border-slate-300 p-6"
      >
        {questions.map((question, i) => (
          <AccordionItem key={i} title={question.question}>
            {question.answer ?? defaultContent}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
