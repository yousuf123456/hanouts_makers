import React from "react";

import { StepsToStartSelling } from "./components/StepsToStartSelling";
import { WhySellOnHandouts } from "./components/WhySellOnHandouts";
import { becomeASellerGuideQuestions } from "../constants/FAQ's";
import { Testemonials } from "./components/Testemonials";
import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";
import { FAQ } from "../sharedComponents/FAQ";

export default async function IndexPage() {
  // const currentVendor = await fetch(
  //   "http://localhost:3000/api/updateSessionData",
  //   {
  //     // headers: {
  //     //   // "x-user-id": "62186b46-011a-4d61-b3b9-7547f315961d",
  //     //   cookie: `sAccessToken=${access_token}`,
  //     //   // Authorization: `Bearer ${access_token}`,
  //     // },
  //     method: "post",
  //   }
  // );

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-12 pb-8">
        <div className="flex flex-col gap-0">
          <SignInForm />
          <SignUpForm />
        </div>

        <div className="flex flex-col gap-16 px-12">
          <WhySellOnHandouts />

          <Testemonials />

          <StepsToStartSelling />

          <FAQ questions={becomeASellerGuideQuestions} />
        </div>
      </div>
    </div>
  );
}
