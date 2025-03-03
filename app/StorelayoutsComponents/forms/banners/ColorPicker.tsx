import React, { useEffect } from "react";
import { Controller, FieldValues, UseFormWatch } from "react-hook-form";

import { HexColorPicker } from "react-colorful";
import { InputHeading } from "@/app/_components/InputHeading";

interface ColorPickerProps {
  control: any;
  watch: UseFormWatch<FieldValues>;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ control, watch }) => {
  const isColorBanner = watch("isColorBanner");
  const bannerColor = watch("bannerColor");

  useEffect(() => {
    console.log(bannerColor);
  }, [bannerColor]);
  if (!isColorBanner) return;
  return (
    <div className="flex flex-col gap-2">
      <InputHeading>Choose Color For Banner</InputHeading>

      <Controller
        control={control}
        name="bannerColor"
        render={({ field }) => (
          <HexColorPicker
            color={bannerColor}
            onChange={(color) => field.onChange(color)}
          />
        )}
      />
    </div>
  );
};
