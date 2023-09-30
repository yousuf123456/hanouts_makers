"use client";

import React, { useEffect, useState } from "react";
import { Section } from "./Section";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FormParts } from "./FormParts";

import { useInView } from "react-intersection-observer";
import { SectionHeading } from "./SectionHeading";
import { BasicInfoInputs } from "./BasicInfoInputs";
import { DescriptionInputs } from "./DescriptionInputs";

export const AddProductForm = () => {
  const [currentPartOn, setCurrentPartOn] = useState(1);

  const [basicInfoRef, basicInfoInView] = useInView({ threshold: 0.5 });
  const [serviceRef, serviceInView] = useInView({ threshold: 0.7 });
  const [descRef, descInView] = useInView();
  const [varRef, varInView] = useInView();

  useEffect(() => {
    if (basicInfoInView) setCurrentPartOn(1);
  }, [basicInfoInView]);

  useEffect(() => {
    if (descInView) setCurrentPartOn(2);
  }, [descInView]);

  useEffect(() => {
    if (varInView) setCurrentPartOn(3);
  }, [varInView]);

  useEffect(() => {
    if (serviceInView) setCurrentPartOn(4);
  }, [serviceInView]);

  const [images, setImages] = useState<string[]>([]);
  const { handleSubmit, register, setValue, watch, control } =
    useForm<FieldValues>({
      defaultValues: {
        name: "",
        highlights: "",
        description: "",
        categoryString: "",
        whatIsInTheBox: "",
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //Add the product here
  };

  return (
    <div className="flex flex-col gap-4">
      <Section className="z-[99] sticky top-3 py-3">
        <FormParts currentPartOn={currentPartOn} />
      </Section>

      <Section className="flex flex-col gap-4" id="basicInfo">
        <SectionHeading>Basic Information</SectionHeading>

        <div ref={basicInfoRef}>
          <BasicInfoInputs
            watch={watch}
            images={images}
            control={control}
            register={register}
            setValue={setValue}
            setImages={setImages}
          />
        </div>
      </Section>

      <Section className="flex flex-col gap-4" id="description">
        <SectionHeading>Product Description</SectionHeading>

        <div ref={descRef}>
          <DescriptionInputs control={control} />
        </div>
      </Section>
    </div>
  );
};
