const jwt = require("jsonwebtoken");
const secretKey = "7Wa$5&3W4z9Z-gTs";

export class JwtHandler {
  jwtSign(id: string) {
    return jwt.sign({ _id: id }, secretKey);
  }

  jwtVerify(token: any) {
    try {
      const tokenVerified = jwt.verify(token, secretKey);
      return tokenVerified;
    } catch (error) {
      return null;
    }
  }
}
