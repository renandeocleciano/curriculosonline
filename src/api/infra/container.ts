import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { HomeService } from "../services/home.service";
import { AuthService } from "../services/auth.service";
import { SessionsModule } from "./database/session";
import { UserService } from "../services/user.service";

export const loadContainer = (app: Application) => {
  const Container = createContainer({
    injectionMode: "CLASSIC",
  });

  Container.register({
    homeService: asClass(HomeService).scoped(),
    authService: asClass(AuthService).scoped(),
    sessionModule: asClass(SessionsModule).scoped(),
    userService: asClass(UserService).scoped(),
  });

  app.use(scopePerRequest(Container));
};
