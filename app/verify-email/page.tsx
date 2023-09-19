"use client";
import React, { useEffect } from "react";
import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";

async function sendEmail() {
  try {
    let response = await sendVerificationEmail();
    if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
      window.location.assign("/");
    } else {
      console.log("Please check your email and click the link in it");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      console.log(err.message);
    } else {
      console.log(err);
      console.log("Oops! Something went wrong.");
    }
  }
}

export default function VerifyEmailPage() {
  useEffect(() => {
    sendEmail();
  }, []);
  return <div>Email has been sent to your email</div>;
}
