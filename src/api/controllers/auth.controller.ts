import { POST, route } from "awilix-express";
import { Request, Response, NextFunction } from "express";
import {
  PersonalInfo,
  UserDTOCreateAPI,
  UserDTOLoginAPI,
} from "../domain/dtos/user.dto";
import { AuthService } from "../services/auth.service";
import { validate } from "class-validator";
import { ErrorException } from "../infra/handlers/error-exception";
import { ErrorCode } from "../infra/handlers/error-code";
import { ICustomRequest } from "../domain/interfaces/request.interface";

@route("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @route("/register")
  @POST()
  async registeruser(req: Request, res: Response, next: NextFunction) {
    try {
      const personalInfo = new PersonalInfo();
      personalInfo.firstName = req.body.firstName;
      personalInfo.lastName = req.body.lastName;
      personalInfo.birthDay = {
        day: parseInt(req.body.bday),
        month: parseInt(req.body.bmonth),
        year: parseInt(req.body.byear),
      };

      const user = new UserDTOCreateAPI();
      user.email = req.body.email;
      user.password = req.body.password;

      user.personalInfo = personalInfo;

      const errors = await validate(user);
      if (!errors.length) {
        await this.authService.registerUser(user);
        return res.send({ user: user });
      }
      next(new ErrorException(ErrorCode.ValidationError, errors));
    } catch (error) {
      next(new ErrorException(ErrorCode.AsyncError, error));
    }
  }

  @route("/login")
  @POST()
  async login(req: ICustomRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = new UserDTOLoginAPI();
      user.email = email;
      user.password = password;

      const errors = await validate(user);
      if (!errors.length) {
        const userByEmail = await this.authService.checkUserByEmail(email);
        if (userByEmail) {
          const checkPass = this.authService.passwordMatch(
            password,
            userByEmail.password
          );
          if (checkPass) {
            const token = await this.authService.getAuthToken(userByEmail);
            req.session.loggedIn = true;
            req.session.user = userByEmail.personalInfo.firstName;
            req.session.token = token;
            return res.send({ token: token });
          }
        }
      }
      next(new ErrorException(ErrorCode.Unauthenticated, errors));
    } catch (error) {
      next(new ErrorException(ErrorCode.AsyncError, error));
    }
  }

  @route("/logout")
  @POST()
  async logout(req: ICustomRequest, res: Response, next: NextFunction) {
    try {
      req.session.destroy();
      res.locals.session.destroy();
      return res.send({ logout: true });
    } catch (error) {
      next(new ErrorException(ErrorCode.AsyncError, error));
    }
  }
}
