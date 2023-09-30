import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";

interface FormPartProps {
  value: number;
  label: string;
  Icon: IconType;
  sectionId: string;
  firstPart?: boolean;
  currentPartOn: number;
}

export const FormPart: React.FC<FormPartProps> = ({
  value,
  firstPart,
  currentPartOn,
  sectionId,
  Icon,
  label,
}) => {
  const isSelectedOrBeyond = value <= currentPartOn;

  const onClick = () => {
    const section = document.getElementById(sectionId);
    const top = section?.getBoundingClientRect().top! + window.scrollY;

    window.scrollTo({
      top: top! - 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex gap-0 items-center pb-6">
      {!firstPart && (
        <div
          className={cn(
            "bg-blue-100 w-48 h-[2px]",
            isSelectedOrBeyond && "bg-themeBlue"
          )}
        />
      )}

      <div
        onClick={onClick}
        className={cn(
          "relative cursor-pointer w-8 h-8 flex justify-center items-center rounded-full border-2 transition-all hover:bg-themeBlue hover:border-themeBlue border-blue-100 group",
          isSelectedOrBeyond && "border-themeBlue bg-themeBlue"
        )}
      >
        <Icon
          className={cn(
            "w-[14px] h-[14px] text-slate-400 group-hover:text-white transition-all",
            isSelectedOrBeyond && "text-white"
          )}
        />

        <p
          className={cn(
            "h-16 min-w-max absolute group-hover:text-themeSecondary -bottom-7 left-1/2 -translate-x-1/2 flex justify-center items-end text-sm font-text text-slate-400",
            isSelectedOrBeyond && "text-themeSecondary"
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
};
