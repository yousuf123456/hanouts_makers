import React from "react";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { UploadBannerImages } from "./UploadBannerImages";
import { InputHeading } from "@/app/_components/InputHeading";
import { MiniPreview } from "../MiniPreview";
import { TextInput } from "@/app/_components/TextInput";
import { CheckBox } from "@/app/_components/Checkbox";
import { HideModuleHeadingFields } from "../HideModuleHeadingFields";
import { FormActions } from "../FormActions";

import { ColorPicker } from "./ColorPicker";

const layoutsBannersOrientationData: any = {
  ThreeImagesBanner_A: {
    banner1: "Square",
    banner3: "Square",
    banner2: "Landscape",
  },
  ThreeImagesBanner_B: {
    banner1: "Landscape",
    banner3: "Square",
    banner2: "Square",
  },
  ThreeImagesBanner_C: {
    banner1: "Landscape",
    banner3: "Square",
    banner2: "Square",
  },
  FourImagesBanner_A: {
    banner1: "Square",
    banner3: "Square",
    banner2: "Square",
    banner4: "Square",
  },
  FourImagesBanner_B: {
    banner1: "Landscape",
    banner3: "Square",
    banner2: "Square",
    banner4: "Landscape",
  },
  CarouselBanner: {
    banner1: "Landscape",
    banner3: "Landscape",
    banner2: "Landscape",
    banner4: "Landscape",
  },
  SingleBanner: {
    banner: "Landscape",
  },
  StoreBanner: {
    banner: "Landscape",
  },
  FeaturedImageBanner: {
    banner: "Landscape",
  },
};

const defaultFourImagesBannerData = {
  banner1: undefined,
  banner2: undefined,
  banner3: undefined,
  banner4: undefined,
};
const defaultThreeImagesBannerData = {
  banner1: undefined,
  banner2: undefined,
  banner3: undefined,
};
const defaultSingleBannerData = {
  banner: undefined,
};
const defaultBannerLayoutsData: any = {
  ThreeImagesBanner_A: defaultThreeImagesBannerData,
  ThreeImagesBanner_B: defaultThreeImagesBannerData,
  ThreeImagesBanner_C: defaultThreeImagesBannerData,
  FourImagesBanner_A: defaultFourImagesBannerData,
  FourImagesBanner_B: defaultFourImagesBannerData,
  FeaturedImageBanner: defaultSingleBannerData,
  CarouselBanner: defaultFourImagesBannerData,
  SingleBanner: defaultSingleBannerData,
  StoreBanner: {
    banner: undefined,
    logo: undefined,
  },
};

interface BannersFormProps {
  initialData: {
    [key: string]: any;
  };
  componentName: string;
  onEditLayoutFormSubmit: (componentName: string, data: FieldValues) => void;
}

export default function BannersForm({
  onEditLayoutFormSubmit,
  componentName,
  initialData,
}: BannersFormProps) {
  const { register, setValue, handleSubmit, watch, control } =
    useForm<FieldValues>({
      defaultValues: {
        ...(initialData || {}),
        withoutModuleHeading: !!initialData.withoutModuleHeading,
      },
    });

  const layoutBannersOrintationData =
    layoutsBannersOrientationData[componentName];

  const onAllUploaded = (bannerImagesData: {
    [key: string]: undefined | string;
  }) => {
    Object.keys(bannerImagesData).map((bannerName) =>
      setValue(bannerName, bannerImagesData[bannerName])
    );
  };

  const defaultBannersData = defaultBannerLayoutsData[componentName];

  const bannersInitialData = Object.keys(initialData).reduce(
    (acc: any, key) => {
      if (key.includes("banner")) {
        acc[key] = initialData[key];
      }
      return acc;
    },
    {}
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onEditLayoutFormSubmit(componentName, data);
  };

  const isStoreBanner = componentName === "StoreBanner";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <InputHeading className="text-base">
            {isStoreBanner ? "Banner and Logo" : "Banner Images"}
          </InputHeading>
          <UploadBannerImages
            layoutBannersOrintationData={layoutBannersOrintationData}
            initialBannersData={
              Object.keys(bannersInitialData).length > 0
                ? bannersInitialData
                : defaultBannersData
            }
            onAllUploaded={onAllUploaded}
          >
            <MiniPreview componentName={componentName} />
          </UploadBannerImages>
        </div>

        {componentName === "FeaturedImageBanner" && (
          <>
            <div className="flex flex-col gap-0">
              <InputHeading fieldTooltip="Enter a brief banner heading. It should not be too long">
                Banner Heading
              </InputHeading>
              <TextInput
                id="bannerHeading"
                register={register}
                placeholder="Enter Banner Heading"
              />
            </div>

            <div className="flex flex-col gap-0">
              <InputHeading fieldTooltip="Enter a brief banner description. It should not be too long">
                Banner Decription
              </InputHeading>
              <TextInput
                id="bannerDecription"
                register={register}
                placeholder="Enter Banner Description"
              />
            </div>
          </>
        )}

        {isStoreBanner && (
          <div className="flex flex-col gap-0">
            <InputHeading>Store Name</InputHeading>
            <TextInput
              id="storeName"
              register={register}
              placeholder="Enter Store Name"
            />
          </div>
        )}

        {isStoreBanner && (
          <div className="flex items-center gap-2">
            <InputHeading fieldTooltip="Show color banner instead of picture">
              Enable Color Banner
            </InputHeading>

            <Controller
              control={control}
              name="isColorBanner"
              defaultValue={false}
              render={({ field }) => <CheckBox field={field} />}
            />
          </div>
        )}

        {isStoreBanner && <ColorPicker control={control} watch={watch} />}

        {!initialData.withoutModuleHeading && (
          <HideModuleHeadingFields register={register} control={control} />
        )}

        <FormActions />
      </div>
    </form>
  );
}
