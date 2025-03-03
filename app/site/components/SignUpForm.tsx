"use client";

import { Input2 } from "@/app/sharedComponents/Input2";
import { LoadingButton } from "@/app/sharedComponents/LoadingButton";
import { signUp } from "supertokens-web-js/recipe/emailpassword";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { doesSessionExist } from "supertokens-web-js/recipe/session";
import axios from "axios";
import { useRouter } from "next/navigation";

async function SignUp(email: string, password: string) {
  let response = await signUp({
    formFields: [
      {
        id: "email",
        value: email,
      },
      {
        id: "password",
        value: password,
      },
    ],
  });

  return response;
}

export const SignUpForm: any = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const iconClassName =
    "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 cursor-pointer";

  const onClick = () => setShow((show) => !show);
  const onClick2 = () => setShow2((show) => !show);

  const eyeIcon = show ? (
    <HiEyeOff className={iconClassName} onClick={onClick} />
  ) : (
    <HiEye className={iconClassName} onClick={onClick} />
  );

  const eyeIcon2 = show2 ? (
    <HiEyeOff className={iconClassName} onClick={onClick2} />
  ) : (
    <HiEye className={iconClassName} onClick={onClick2} />
  );

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setError("");
    const { phone, password, confirmPassword } = data;
    if (password !== confirmPassword) return;
    setIsLoading(true);

    SignUp("+92" + phone.substring(1), password)
      .then((res) => {
        if (res.status === "FIELD_ERROR") {
          res.formFields.forEach((formField) => {
            if (formField.id === "email") {
              setError(
                "Error: Account with this phone already exists. SignIn instead",
              );
            } else if (formField.id === "password") {
              setError("Error: " + formField.error);
            }
          });
        } else {
          router.push("second-factor");
        }
      })
      .catch((e) => {
        if (e.isSuperTokensGeneralError === true) setError(e.message);
        else setError("Error: Oops! Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="bg-themeBlue p-12">
      <div className="flex items-start justify-around gap-16">
        <div className="flex flex-col items-center gap-3 pt-16">
          <h1 className=" font-heading text-[2.7rem] font-bold leading-10 text-white">
            Turn your passion into profit
          </h1>

          <h4 className="font-sans text-lg font-medium text-white">
            Sell your decor items on Handouts and reach millions of buyers.
          </h4>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              "flex w-[460px] flex-col items-center gap-3 rounded-lg bg-white px-6 py-4",
              error && "bg-red-50",
            )}
          >
            <h2 className="font-text text-2xl font-semibold text-themeSecondary">
              Create Seller Account
            </h2>

            <p className="text-sm text-black">
              Welcome! Millions of Handouts users are waiting to buy your
              product.
            </p>

            {error && (
              <p className="w-full text-start text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            <div className="mt-4 w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full flex-col gap-4">
                  <Input2
                    id="phone"
                    register={register as any}
                    watch={watch as any}
                    label="Phone number"
                    placeholder="e.g., +92624 466373 734"
                    type="text"
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />

                  <Input2
                    id="password"
                    register={register as any}
                    watch={watch as any}
                    label="Password"
                    placeholder="Enter your password"
                    type={show2 ? "text" : "password"}
                    icon={eyeIcon2}
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />

                  <Input2
                    id="confirmPassword"
                    register={register as any}
                    watch={watch as any}
                    label="Confirm Password"
                    validateConfirmPass={true}
                    placeholder="Enter your password again"
                    type={show ? "text" : "password"}
                    icon={eyeIcon}
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />

                  <LoadingButton
                    className="mt-3"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    Create Account
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
