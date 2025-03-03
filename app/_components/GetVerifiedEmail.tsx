import { InputHeading } from "@/app/_components/InputHeading";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi2";

import {
  clearLoginAttemptInfo,
  setLoginAttemptInfo,
} from "supertokens-web-js/recipe/passwordless";

import { getLoginAttemptInfo } from "supertokens-web-js/recipe/passwordless";
import { resendOTP, sendOTP } from "../second-factor/components/EnterOTPForm";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { ResendOTPTimer } from "./ResendOTPTimer";

async function hasInitialOTPBeenSent() {
  const loginAttemptInfo = await getLoginAttemptInfo();

  return loginAttemptInfo;
}

interface GetVerifiedEmailProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onSuccess: (email: string) => any;
}

export default function GetVerifiedEmail({
  setOpen,
  open,
  onSuccess,
}: GetVerifiedEmailProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [initialOTPSent, setInitialOTPSent] = useState(false);

  const [lastResend, setLastResend] = useState<number | undefined>();

  const onSendOTP = async () => {
    setIsLoading(true);
    if (!email) return;

    await sendOTP({
      email,
      onOTPSent: async () => {
        const loginAttemptInfo = (await getLoginAttemptInfo()) as any;
        await setLoginAttemptInfo({
          attemptInfo: {
            ...loginAttemptInfo,
            email: email,
            lastResend: Date.now(),
          },
        });

        setLastResend(Date.now());
        setInitialOTPSent(true);
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    hasInitialOTPBeenSent().then((res: any) => {
      const email = res?.email;
      const lastResend = res?.lastResend;

      setEmail(email || "");
      setLastResend(lastResend);

      setInitialOTPSent(res !== undefined && !!email);
    });
  }, []);

  const onChangeEmail = () => {
    clearLoginAttemptInfo();
    setInitialOTPSent(false);
  };

  const onEnterOTP = async () => {
    if (!otp) return toast.error("Please Enter OTP");
    if (otp.length !== 6) return toast.error("Invalid OTP");

    const loginAttemptInfo = await getLoginAttemptInfo();
    if (loginAttemptInfo === undefined)
      return toast.error("Something went wrong");

    setIsLoading(true);

    try {
      const response = await axios.post("../api/otp/consumeCode", {
        otp,
        email,
        verifyingUserEmail: true,
        deviceId: loginAttemptInfo.deviceId,
        preAuthSessionId: loginAttemptInfo.preAuthSessionId,
      });

      if (response.data.status === "OK") {
        onSuccess(email);
        clearLoginAttemptInfo();
        toast.success("Succesfully verified your email");
      } else if (response.data.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
        toast.error(
          "Wrong OTP! Please try again. Number of attempts left: " +
            (response.data.maximumCodeInputAttempts -
              response.data.failedCodeInputAttemptCount)
        );
      } else if (response.data.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
        toast.error(
          "Old OTP entered. Please regenerate a new one and try again"
        );
      } else {
        toast.error("Verification failed. Please try again");
      }
    } catch (e) {
      console.log(e);
      toast.error("Oops! Something went wrong.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <DialogModel open={open} setOpen={setOpen}>
        <DialogHeader>
          <DialogTitle>
            {initialOTPSent ? "Enter OTP" : "Change Email"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8 mt-4">
          {initialOTPSent && (
            <div className="flex flex-col items-center gap-0">
              <p className="text-gray-700 font-roboto">
                An OTP was sent to you email
              </p>
              <p className=" text-black font-roboto">{email}</p>
            </div>
          )}

          {initialOTPSent && (
            <div className="flex flex-col gap-0">
              <div className="px-4 flex w-full justify-between items-center">
                <p className="font-semibold text-black text-sm font-roboto">
                  OTP
                </p>

                <ResendOTPTimer lastResend={lastResend}>
                  <p
                    className="text-sm text-themeBlue cursor-pointer font-roboto hover:underline"
                    onClick={() => {
                      resendOTP({ setLastResend, setInitialOTPSent });
                    }}
                  >
                    Resend OTP
                  </p>
                </ResendOTPTimer>
              </div>
              <Input
                value={otp}
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          {initialOTPSent && (
            <div className="flex flex-col gap-3 items-center w-full">
              <Button
                onClick={onEnterOTP}
                className="w-full flex items-center gap-3 bg-themeBlue hover:bg-blue-500"
              >
                Enter OTP
                {isLoading && (
                  <Loader2 className="text-white w-4 h-4 animate-spin" />
                )}
              </Button>{" "}
              <p
                onClick={onChangeEmail}
                className="flex items-center gap-1 group text-sm font-roboto cursor-pointer"
              >
                <HiArrowLeft className="w-4 relative group-hover:-left-2 flex-shrink-0 h-4 text-gray-700" />{" "}
                Change Email
              </p>
            </div>
          )}

          {!initialOTPSent && (
            <div className="flex flex-col gap-0 mt-4">
              <InputHeading>New Email</InputHeading>

              <Input
                value={email}
                placeholder="Enter New Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {!initialOTPSent && (
            <Button
              onClick={onSendOTP}
              className="w-full flex items-center gap-3 bg-themeBlue hover:bg-blue-500"
            >
              Verify Email
              {isLoading && (
                <Loader2 className="text-white w-4 h-4 animate-spin" />
              )}
            </Button>
          )}
        </div>
      </DialogModel>
    </>
  );
}
