import React, { useEffect } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { HideModuleHeadingFields } from "../HideModuleHeadingFields";
import { FormActions } from "../FormActions";
import { UploadBannerImages } from "../banners/UploadBannerImages";
import { InputHeading } from "@/app/_components/InputHeading";
import { NumericInput } from "@/app/_components/NumericInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddProduct } from "@/app/_components/AddProduct";
import { FilterProducts } from "./FilterProducts";
import { SelectOptions } from "@/app/sharedComponents/SelectOptions";
import { numberOfProductsToShowOptions } from "@/app/constants/selectOptions";

interface ProductsFormProps {
  initialData: {
    [key: string]: any;
  };
  componentName: string;
  onEditLayoutFormSubmit: (componentName: string, data: FieldValues) => void;
}

export default function ProductsForm({
  initialData,
  componentName,
  onEditLayoutFormSubmit,
}: ProductsFormProps) {
  const { register, setValue, handleSubmit, control, watch } =
    useForm<FieldValues>({
      defaultValues: {
        ...(initialData || {}),
        withoutModuleHeading: !!initialData.withoutModuleHeading,
        productsSelection:
          initialData?.productsSelection ||
          componentName === "UnderBudgetProducts"
            ? "automatic"
            : "filter",
      },
    });

  const onAllUpload = (bannerImagesData: {
    [key: string]: undefined | string;
  }) => {
    Object.keys(bannerImagesData).map((bannerName) => {
      setValue(bannerName, bannerImagesData[bannerName]);
    });
  };

  const bannersInitialData = Object.keys(initialData).reduce(
    (acc: any, key) => {
      if (key.includes("banner")) {
        acc[key] = initialData[key];
      }
      return acc;
    },
    {}
  );

  const products = watch("products");
  const productsSelection = watch("productsSelection");

  const noOfProductsToShow = watch("noOfProductsToShow");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onEditLayoutFormSubmit(componentName, data);
  };

  const onFilteredProductsConfirm = (ids: string[]) => {
    setValue("products", ids);
  };

  // const budget = watch("budget");

  // useEffect(() => {
  //   if (!budget) return;

  //   const moduleHeading = `Under ${budget} Rs`;
  //   setValue("moduleHeading", moduleHeading);
  // }, [budget]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <InputHeading>Products Selection</InputHeading>
          <Controller
            control={control}
            name="productsSelection"
            render={({ field }) => (
              <RadioGroup
                {...field}
                defaultValue={
                  componentName === "UnderBudgetProducts"
                    ? "automatic"
                    : "filter"
                }
                className="flex items-center gap-16"
                onValueChange={(val) => field.onChange(val)}
              >
                {componentName !== "UnderBudgetProducts" ? (
                  <div className="flex items-center gap-3">
                    <InputHeading>Filter</InputHeading>
                    <RadioGroupItem value="filter" id="r2" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <InputHeading>Automatic</InputHeading>
                    <RadioGroupItem value="automatic" id="r3" />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <InputHeading>Manual</InputHeading>
                  <RadioGroupItem value="manual" id="r3" />
                </div>
              </RadioGroup>
            )}
          />

          <div className="flex flex-col gap-0">
            {products && products.length > 0 && (
              <p className="font-roboto text-sm text-themeBlue">
                Total {products.length} Products Selected
              </p>
            )}

            {productsSelection === "manual" ? (
              <AddProduct
                isCurrentlyLive={false}
                selectedProducts={products || []}
                maxSelections={noOfProductsToShow}
                onAddProducts={(ids) => setValue("products", ids)}
              />
            ) : productsSelection !== "automatic" ? (
              <FilterProducts
                onConfirm={onFilteredProductsConfirm}
                noOfProductsToShow={noOfProductsToShow}
              />
            ) : (
              <p className="font-roboto text-sm text-themeBlue">
                The system will automatically select the most recent products
                that come under your given budget
              </p>
            )}
          </div>
        </div>

        {componentName === "BannerSliderProducts" && (
          <UploadBannerImages
            onAllUploaded={onAllUpload}
            initialBannersData={bannersInitialData || { banner: undefined }}
            layoutBannersOrintationData={{ banner: "Landscape" }}
          >
            <div className="flex aspect-4 h-auto w-48 items-center justify-center bg-neutral-200">
              1
            </div>
          </UploadBannerImages>
        )}

        {componentName === "UnderBudgetProducts" && (
          <div className="flex flex-col gap-0">
            <InputHeading fieldTooltip="Products with price less than entered budget will show.">
              Budget
            </InputHeading>

            <NumericInput
              id="budget"
              register={register}
              placeholder="Enter Budget Price"
            />
          </div>
        )}

        <div className="flex flex-col gap-0">
          <InputHeading fieldTooltip="Number of products to show">
            Number Of Products
          </InputHeading>

          <Controller
            control={control}
            defaultValue={13}
            name="noOfProductsToShow"
            render={({ field }) => (
              <SelectOptions
                field={field}
                type="number"
                defaultValue={"13"}
                label="Number Of Products"
                options={numberOfProductsToShowOptions}
              />
            )}
          />
        </div>

        {!initialData.withoutModuleHeading &&
          componentName !== "UnderBudgetProducts" && (
            <HideModuleHeadingFields register={register} control={control} />
          )}

        <FormActions />
      </div>
    </form>
  );
}
