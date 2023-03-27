export const decoding = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const encoding = (claims: any) => {
  const HMACSHA256 = (stringToSign: any, secret: any) => "not_implemented";

  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const encodedHeaders = btoa(JSON.stringify(header));

  const encodedPlayload = btoa(JSON.stringify(claims));

  const signature = HMACSHA256(`${encodedHeaders}.${encodedPlayload}`, "tori");
  const encodedSignature = btoa(signature);

  const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`;
  const final = jwt.replaceAll("=", "");
  return final;
};
