import { GET, route, before } from "awilix-express";
import { NextFunction, Response } from "express";
import { ICustomRequest } from "../domain/interfaces/request.interface";
import { ErrorCode } from "../infra/handlers/error-code";
import { ErrorException } from "../infra/handlers/error-exception";
import { authenticate } from "../infra/middleware/authenticate";
import { logger } from "../infra/middleware/logger";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@route("/home")
export class HomeController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  @GET()
  @route("/profile")
  @before([authenticate])
  async profile(req: ICustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = await this.authService.getIdByToken(req.session.token);
      const user = await this.userService.getById(userId);
      return res.send({ user: user.toObject() });
    } catch (error) {
      logger.error(error);
      next(new ErrorException(ErrorCode.AsyncError, error));
    }
  }
}
