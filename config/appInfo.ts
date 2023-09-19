export const websiteDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Handouts",
  websiteDomain: websiteDomain!,
  apiDomain: websiteDomain! + "/api",
  apiBasePath: "/api/auth",
  websiteBasePath: "/",
};
