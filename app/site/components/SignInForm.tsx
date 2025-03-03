"use client";
import React, { useEffect, useState } from "react";

import { Input2 } from "@/app/sharedComponents/Input2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { LoadingButton } from "@/app/sharedComponents/LoadingButton";
import Session from "supertokens-web-js/recipe/session";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ForgetPassword } from "./ForgetPassword";
// import { GetVerifiedEmail } from "@/app/components/GetVerifiedEmail";

async function SignIn(email: string, password: string) {
  let response = await signIn({
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

export const SignInForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { watch, register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const redirectTo = useSearchParams().get("redirectToPath");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const { phone, password } = data;

    SignIn("+92" + phone.substring(1), password)
      .then((res) => {
        if (
          res.status === "FIELD_ERROR" ||
          res.status === "WRONG_CREDENTIALS_ERROR"
        )
          setError("Error: Invalid phone or password");
        else {
          toast.success("Signed In Succesfully");
          router.push(redirectTo || "/accountVerification");
        }
      })
      .catch((e) => {
        if (e.isSuperTokensGeneralError === true)
          setError("Error: " + e.message);
        else setError("Error: Oops! Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const onLogout = () => {
    Session.signOut().then(() => toast.success("Succesfully Logged Out"));
  };

  return (
    <div className="flex justify-between px-16 py-3">
      <div className="flex items-center gap-3">
        <div className=" relative h-12 w-12">
          <Image src={"/logos/HandoutsLOGO.png"} alt="Handouts Logo" fill />
        </div>

        <h4 className="text-center text-lg font-bold leading-5 text-themeBlue">
          Handouts <br /> Makers
        </h4>
      </div>

      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-4">
            <div className="w-64">
              <Input2
                placeholder="e.g., +92624 466373 734"
                register={register as any}
                watch={watch as any}
                label="Phone number"
                isLoading={isLoading}
                disabled={isLoading}
                required={true}
                error={error}
                id="phone"
                type="text"
              />
            </div>

            <div className="w-64">
              <Input2
                placeholder="Enter your password"
                register={register as any}
                isLoading={isLoading}
                disabled={isLoading}
                watch={watch as any}
                label="Password"
                required={true}
                error={error}
                type="password"
                id="password"
              />
            </div>

            <LoadingButton type="submit" isLoading={isLoading}>
              SignIn
            </LoadingButton>

            <Button type="button" className="px-5" size="sm" onClick={onLogout}>
              Logout
            </Button>

            {/* <GetVerifiedEmail /> */}
          </div>

          <div className="flex items-center gap-8">
            {error && (
              <p className="text-xs font-medium text-red-500">{error}</p>
            )}

            <ForgetPassword />
          </div>
        </div>
      </form>
    </div>
  );
};
