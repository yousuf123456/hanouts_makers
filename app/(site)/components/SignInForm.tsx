"use client";
import React, { useEffect, useState } from "react";

import { Input2 } from "@/app/sharedComponents/Input2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { LoadingButton } from "@/app/sharedComponents/LoadingButton";
import Session from "supertokens-web-js/recipe/session";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import axios from "axios";

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
          console.log("Signed In Succesfully");
          router.push("/accountVerification");
        }
      })
      .catch((e) => {
        if (e.isSuperTokensGeneralError === true)
          setError("Error: " + e.message);
        else setError("Error: Oops! Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex justify-between py-3 px-16">
      <div className="flex items-center gap-3">
        <div className=" relative w-12 h-12">
          <Image src={"/logos/HandoutsLOGO.png"} alt="Handouts Logo" fill />
        </div>

        <h4 className="text-center leading-5 text-lg font-bold text-themeBlue">
          Handouts <br /> Makers
        </h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-end">
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

            <Button type="button" onClick={() => Session.signOut()}>
              Logout
            </Button>
          </div>

          <div className="flex items-center gap-8">
            {error && (
              <p className="text-xs font-medium text-red-500">{error}</p>
            )}

            <p className="text-xs font-medium hover:underline cursor-pointer text-black">
              Forgot Password ?
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
