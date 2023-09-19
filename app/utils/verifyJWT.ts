import JsonWebToken, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { redirect } from "next/navigation";

export const verifyJWT = () => {
  var client = jwksClient({
    jwksUri: process.env.NEXT_PUBLIC_APP_DOMAIN! + "/api/auth/jwt/jwks.json",
  });

  function getKey(header: JwtHeader, callback: SigningKeyCallback) {
    client.getSigningKey(header.kid, function (err, key) {
      var signingKey = key!.getPublicKey();
      callback(err, signingKey);
    });
  }

  let jwt = "..."; // fetch the JWT from sAccessToken cookie or Authorization Bearer header
  const decoded = JsonWebToken.verify(jwt, getKey, {}, function (err, decoded) {
    let decodedJWT = decoded;
    if (!decodedJWT) {
      redirect("/refresh-token?redirectBack=accountVerification");
    }
  });
};
