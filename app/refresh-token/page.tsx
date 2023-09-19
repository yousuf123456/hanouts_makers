"use client";
// import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import {
  SessionAuth,
  doesSessionExist,
} from "supertokens-auth-react/recipe/session";
import Session from "supertokens-web-js/recipe/session";

export default async function RefreshTokenPage() {
  //   console.log(await Session.doesSessionExist());
  //   const router = useRouter();
  //   const redirectBackTo = useSearchParams()?.get("redirectBack") as string;

  //   useEffect(() => {
  //     Session.attemptRefreshingSession().then((success) => {
  //       if (success) {
  //         console.log("Success");
  //         router.push(redirectBackTo);
  //       } else {
  //         console.log("Failure");
  //         router.push("/");
  //       }
  //     });
  //   }, []);

  return (
    <SessionAuth>
      <div>Wait ...</div>
    </SessionAuth>
  );
}
