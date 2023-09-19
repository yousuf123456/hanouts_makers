import React from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { Button } from "./Button";

type Props = {
  variant?: "default" | "outline" | null | undefined;
  type?: "button" | "submit" | "reset";
  loaderColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const LoadingButton = ({
  variant,
  onClick,
  isLoading,
  children,
  disabled,
  type,
  loaderColor,
  className,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={disabled}
      className={clsx(
        !variant &&
          "flex items-center justify-center gap-3 rounded-sm bg-themeBlue px-4 py-2 font-medium text-white hover:bg-blue-700 sm:px-6",
        "h-9",
        className,
        disabled &&
          !className &&
          !variant &&
          "bg-opacity-60 hover:bg-themeBlue hover:bg-opacity-60 active:scale-100",
      )}
    >
      {children}
      {isLoading && (
        <Loader2
          className={clsx(
            "mr-2 h-4 w-4 animate-spin",
            loaderColor ? loaderColor : "text-white",
          )}
        />
      )}
    </Button>
  );
};
