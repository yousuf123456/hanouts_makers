"use client";
import React from "react";

import Rating, { IconContainerProps } from "@mui/material/Rating";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { cn } from "@/app/utils/cn";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const labels: { [index: string]: string } = {
  1: "Negative",
  2: "Neutral",
  3: "Positive",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

interface ResponsesFormProps {
  href?: string;
  hover?: number;
  compact?: boolean;
  showOnly?: boolean;
  value: number | null;
  noLabelOnRes?: boolean;
  setHover?: React.Dispatch<React.SetStateAction<number>>;
  setValue?: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ResponsesForm: React.FC<ResponsesFormProps> = ({
  href,
  value,
  hover,
  compact,
  showOnly,
  setValue,
  setHover,
  noLabelOnRes,
}) => {
  const responsesClassName = cn(
    "mx-2 md:mx-1",
    compact ? "text-[30px]" : "text-[34px] sm:text-[38px]",
  );

  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: (
        <FaFrown
          className={cn(
            responsesClassName,
            "text-red-400",
            compact && value !== 1 && "text-[0px]",
            value !== 1 && "text-slate-300",
          )}
        />
      ),
      label: "Very Dissatisfied",
    },
    2: {
      icon: (
        <FaMeh
          className={cn(
            responsesClassName,
            "text-yellow-400",
            compact && value !== 2 && "text-[0px]",
            value !== 2 && "text-slate-300",
          )}
        />
      ),
      label: "Dissatisfied",
    },
    3: {
      icon: (
        <FaSmile
          className={cn(
            " text-green-500",
            responsesClassName,
            compact && value !== 3 && "text-[0px]",
            value !== 3 && "text-slate-300",
          )}
        />
      ),
      label: "Neutral",
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const router = useRouter();

  return (
    <div
      onClick={() => href && router.push(href)}
      className={clsx(
        "flex w-full items-center justify-center gap-2",
        href && "cursor-pointer",
      )}
    >
      <Rating
        name="hover-feedback"
        value={value}
        max={3}
        getLabelText={getLabelText}
        onChange={(event: any, newValue: any) => {
          if (newValue !== null && setValue) setValue(newValue);
        }}
        onChangeActive={(event: any, newHover: any) => {
          if (setHover) setHover(newHover);
        }}
        IconContainerComponent={IconContainer}
        readOnly={showOnly}
      />

      <p
        className={cn(
          "hidden w-16 text-sm text-black md:block",
          noLabelOnRes && "hidden lg:block",
        )}
      >
        {
          //@ts-ignore
          labels[hover ? (hover !== -1 ? hover : value) : value]
        }
      </p>
    </div>
  );
};
