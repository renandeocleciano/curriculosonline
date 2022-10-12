const userModel = require("../domain/models/user.model");
import * as bcrypt from "bcrypt";
import { JwtHandler } from "../infra/handlers/jwt-handler";
import { logger } from "../infra/middleware/logger";

export class AuthService {
  async registerUser(user: any) {
    try {
      await userModel.create(user);
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async checkUserByEmail(email: any) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      logger.error(error);
    }
  }

  passwordMatch(p1: any, p2: any) {
    return bcrypt.compareSync(p1, p2);
  }

  async getAuthToken(user: any) {
    return await user.generateAuthToken();
  }

  async getIdByToken(token: any) {
    if (!token || token == null) return false;
    const _token = new JwtHandler().jwtVerify(token);
    if (_token && _token != null) {
      return _token._id;
    }
    return null;
  }
}
