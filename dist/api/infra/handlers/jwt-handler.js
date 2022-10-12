"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHandler = void 0;
const jwt = require("jsonwebtoken");
const secretKey = "7Wa$5&3W4z9Z-gTs";
class JwtHandler {
    jwtSign(id) {
        return jwt.sign({ _id: id }, secretKey);
    }
    jwtVerify(token) {
        try {
            const tokenVerified = jwt.verify(token, secretKey);
            return tokenVerified;
        }
        catch (error) {
            return null;
        }
    }
}
exports.JwtHandler = JwtHandler;
