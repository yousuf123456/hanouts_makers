export function getAccessTokenFromCookies() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "sAccessToken") {
      return value;
    }
  }
  return null; // Return null if the access_token cookie is not found
}
