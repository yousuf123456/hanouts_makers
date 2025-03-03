import React, { useState } from "react";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { InputHeading } from "@/app/_components/InputHeading";
import parsePhoneNumber, { PhoneNumber } from "libphonenumber-js/max";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/emailpassword";

const sendPasswordResetLink = async (email: string) => {
  try {
    let response = await sendPasswordResetEmail({
      formFields: [
        {
          id: "email",
          value: email,
        },
      ],
    });
    console.log(response);
    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          toast.error(formField.error);
        }
      });
    } else if (response.status === "PASSWORD_RESET_NOT_ALLOWED") {
      toast.error("Password Reset Not Allowed");
    } else {
      toast.success("Check your whatsapp for reset password link");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }
};

export const ForgetPassword = () => {
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);

  const onSendLink = () => {
    if (!phone) return;
    let parsedPhone = parsePhoneNumber(phone, "PK");

    if (!parsedPhone || !parsedPhone.isValid())
      return toast.error("Phone number is invalid");

    const validPhoneNumber = parsedPhone.number;

    sendPasswordResetLink(validPhoneNumber);
  };

  return (
    <>
      <p
        onClick={() => setOpen(true)}
        className="cursor-pointer text-xs font-medium text-black hover:underline"
      >
        Forgot Password ?
      </p>

      <DialogModel open={open} setOpen={setOpen}>
        <DialogHeader>
          <DialogTitle>Forget Password</DialogTitle>
        </DialogHeader>

        <div className="mt-8 flex w-full flex-col gap-16">
          <div className="flex w-full flex-col gap-0">
            <InputHeading>Enter Phone Number</InputHeading>

            <Input
              value={phone}
              placeholder="Enter Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={onSendLink}>
            Send Reset Password Link
          </Button>
        </div>
      </DialogModel>
    </>
  );
};
