"use client";
import React from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { submitNewPassword } from "supertokens-web-js/recipe/emailpassword";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { InputHeading } from "@/app/_components/InputHeading";
import { Background } from "@/app/_components/Background";
import { TextInput } from "@/app/_components/TextInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const onSubmitNewPassword = async (
  newPassword: string,
  router: AppRouterInstance
) => {
  try {
    let response = await submitNewPassword({
      formFields: [
        {
          id: "password",
          value: newPassword,
        },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        if (formField.id === "password") {
          toast.error(formField.error);
        }
      });
    } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
      // the password reset token in the URL is invalid, expired, or already consumed
      toast.error("Password reset failed. Please try again");
      router.push("/reset-password?error=true");
    } else {
      toast.success("Password reset successful!");
      router.push("/reset-password?success=true");
    }
  } catch (err: any) {
    console.log(err);
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }
};

interface NewPasswordProps {
  isSuccess: boolean;
  isError: boolean;
}

export const NewPassword: React.FC<NewPasswordProps> = ({
  isSuccess,
  isError,
}) => {
  const { register, handleSubmit, watch } = useForm<FieldValues>();

  const { newPassword, confirmNewPassword } = watch();

  const arePasswordsMatching =
    !newPassword || !confirmNewPassword || newPassword === confirmNewPassword;

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!arePasswordsMatching) return toast.error("Passwords do not match");

    onSubmitNewPassword(data.confirmNewPassword, router);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-full min-h-screen items-center justify-center">
        <Background />

        <div className="z-50 w-full max-w-[440px] rounded-md bg-white p-5">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex w-full justify-center">
                <Image
                  src={"/logos/HandoutsLOGO.png"}
                  alt="Handouts Logo"
                  width={48}
                  height={48}
                />
              </div>

              <h1 className="w-full text-center font-roboto text-2xl font-semibold text-themeSecondary">
                Reset Password
              </h1>
            </div>

            {isSuccess && (
              <h3 className="w-full text-center font-roboto text-lg font-semibold text-green-500">
                Succesfully Updated Your Password
              </h3>
            )}

            {isError && (
              <h3 className="w-full text-center font-roboto text-lg font-semibold text-red-500">
                Reset Password Failed! Please Try Again
              </h3>
            )}

            {!isSuccess && !isError && (
              <>
                <div className="mt-6 flex flex-col gap-0">
                  <InputHeading>Enter New Password</InputHeading>

                  <TextInput
                    required
                    id="newPassword"
                    register={register}
                    type="password"
                    placeholder="Enter Your New Password"
                  />
                </div>

                <div className="flex flex-col gap-0">
                  <InputHeading>Confirm New Password</InputHeading>
                  <TextInput
                    required
                    id="confirmNewPassword"
                    register={register}
                    type="password"
                    placeholder="Confirm Your New Password"
                  />
                </div>
              </>
            )}

            {!isSuccess && !isError ? (
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Reset My Password
              </Button>
            ) : (
              <Link href={"/"}>
                <Button className="w-full bg-themeBlue hover:bg-blue-500">
                  Go Back To Login Page
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
