import { cookies } from "next/headers";
export function getAccessTokenFromCookies() {
  const accessToken = cookies().get("sAccessToken")?.value;

  return accessToken;
}
