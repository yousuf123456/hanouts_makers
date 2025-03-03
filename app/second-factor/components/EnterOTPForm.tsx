"use client";
import toast from "react-hot-toast";
import { CharInput } from "./CharInput";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getUserPhoneNumber, shouldShowSecondFactor } from "../../utils/MFA";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { getAccessTokenPayloadSecurely } from "supertokens-web-js/recipe/session";

import {
  RecipeFunctionOptions,
  consumeCode,
  createCode,
  clearLoginAttemptInfo,
  resendCode,
  getLoginAttemptInfo,
  setLoginAttemptInfo,
} from "supertokens-web-js/recipe/passwordless";

import { useRouter } from "next/navigation";
import BackdropLoader from "@/app/sharedComponents/BackdropLoader";
import { Loader2 } from "lucide-react";
import axios from "axios";

async function hasInitialOTPBeenSent() {
  const accessTokenPayload = await getAccessTokenPayloadSecurely();
  return accessTokenPayload.initialOTPSent;
}

interface SendOTPParams {
  email?: string;
  phoneNumber?: string;
  onOTPSent?: () => void;
  options?: RecipeFunctionOptions;
}

export const sendOTP = async (params: SendOTPParams) => {
  const { email, phoneNumber, onOTPSent, options } = params;
  try {
    let createCodeParams: any = {
      ...(phoneNumber ? { phoneNumber } : {}),
      ...(email ? { email } : {}),
      options,
    };

    let response = await createCode(createCodeParams);

    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      return toast.error("Not Allowed");
    }

    if (response.status === "OK") {
      onOTPSent && onOTPSent();
      toast.success(
        phoneNumber
          ? "OTP Sent succesfully"
          : "Please check your email for an OTP"
      );
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error("Something goes wrong sending the otp");
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }
};

export const resendOTP = async (params?: {
  setLastResend?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setInitialOTPSent?: React.Dispatch<React.SetStateAction<boolean>>;
  onRestartFlowError?: () => void;
}) => {
  try {
    let response = await resendCode();
    if (response.status === "RESTART_FLOW_ERROR") {
      if (params?.setInitialOTPSent) {
        clearLoginAttemptInfo();
        return params.setInitialOTPSent(false);
      }

      if (params?.onRestartFlowError) return params.onRestartFlowError();

      return toast.error("Verification Failed. Please Try Again");
    } else {
      const loginAttemptInfo = (await getLoginAttemptInfo()) as any;
      const lastResend = Date.now();
      await setLoginAttemptInfo({
        attemptInfo: { ...loginAttemptInfo, lastResend },
      });

      if (params?.setLastResend) params.setLastResend(lastResend);

      toast.success("OTP resent succesfully");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }
};

export const handleOTPInput = async (otp: string) => {
  try {
    let response = await consumeCode({
      userInputCode: otp,
    });

    return response;
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error("Something goes wrong");
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }
};

export const EnterOTPForm = () => {
  const [verifying, setVerifying] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const { watch, register, setFocus, handleSubmit } = useForm<FieldValues>();

  const router = useRouter();

  let hasSent = false;

  useEffect(() => {
    if (sendingOTP) return;

    const sendOTPWorkflow = async () => {
      if (await shouldShowSecondFactor()) {
        const otpHasBeenSent = await hasInitialOTPBeenSent();

        if (!otpHasBeenSent) {
          const phoneNumber = await getUserPhoneNumber();
          if (!phoneNumber) return;

          setSendingOTP(true);
          sendOTP({ phoneNumber }).finally(() => setSendingOTP(false));
        }
      } else {
        router.push("/");
      }
    };

    sendOTPWorkflow();

    return () => {};
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { char1, char2, char3, char4, char5, char6 } = data;
    const otp = char1 + char2 + char3 + char4 + char5 + char6;

    setVerifying(true);
    handleOTPInput(otp)
      .then((response) => {
        if (!response) return;

        if (response.status === "OK") {
          getAccessTokenPayloadSecurely().then((res) => {
            axios.post("../../api/createSeller", { phone: res.phoneNumber });
          });
          toast.success("Succesfully verified your account");
          router.push("/accountVerification");
          clearLoginAttemptInfo();
        } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
          toast.error(
            "Wrong OTP! Please try again. Number of attempts left: " +
              (response.maximumCodeInputAttempts -
                response.failedCodeInputAttemptCount)
          );
        } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
          toast.error(
            "Old OTP entered. Please regenerate a new one and try again"
          );
        } else {
          toast.error("Login failed. Please try again");
        }
      })
      .finally(() => setVerifying(false));
  };

  const onResend = () => {
    setSendingOTP(true);
    resendOTP().finally(() => setSendingOTP(false));
  };

  return (
    <>
      <BackdropLoader open={verifying} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-16">
          {sendingOTP ? (
            <div className="flex items-center justify-center gap-3">
              <p className="font-text text-sm font-semibold text-gray-700">
                Sending OTP
              </p>

              <Loader2 className="h-6 w-6 animate-spin text-themeSecondary" />
            </div>
          ) : (
            <p className="font-text text-sm font-semibold text-gray-700">
              A 6 digit code has been sent to your number
            </p>
          )}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <CharInput
                  setFocus={setFocus}
                  register={register}
                  watch={watch}
                  id="char1"
                  required
                />

                <CharInput
                  setFocus={setFocus}
                  register={register}
                  watch={watch}
                  id="char2"
                  required
                />

                <CharInput
                  setFocus={setFocus}
                  watch={watch}
                  id="char3"
                  register={register}
                  required
                />

                <CharInput
                  setFocus={setFocus}
                  watch={watch}
                  id="char4"
                  register={register}
                  required
                />

                <CharInput
                  setFocus={setFocus}
                  watch={watch}
                  id="char5"
                  register={register}
                  required
                />

                <CharInput
                  setFocus={setFocus}
                  watch={watch}
                  id="char6"
                  register={register}
                  required
                />
              </div>

              <p
                onClick={onResend}
                className="cursor-pointer font-roboto text-sm font-semibold text-themeBlue hover:underline"
              >
                Resend OTP
              </p>
            </div>

            <Button type="submit" className="bg-themeBlue hover:bg-blue-500">
              Enter OTP
            </Button>

            {/* <Button onClick={() => sendOTP("+923183920797")}>Send oTp</Button> */}
          </div>
        </div>
      </form>
    </>
  );
};
