export default function getRemainingUrl(baseUrl: string, fullUrl: string) {
  if (fullUrl.startsWith(baseUrl)) {
    return fullUrl.substring(baseUrl.length);
  } else {
    return "URL doesn't belong to the base URL provided";
  }
}
