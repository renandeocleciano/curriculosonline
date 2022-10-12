import { UserService } from "../../services/user.service";
import { JwtHandler } from "../handlers/jwt-handler";
import { logger } from "./logger";

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const token = req.session.token;
    if (!token || token == null)
      return res.status(403).json({ acessoNegado: true });
    const _token = new JwtHandler().jwtVerify(token);
    if (_token && _token != null) {
      const user = await new UserService().getByIdAndToken(_token._id, token);
      if (!user) return res.status(403).json({ acessoNegado: true });
    }
  } catch (error) {
    logger.error(error);
    return res.status(403).json({ acessoNegado: true });
  }
  next();
};
