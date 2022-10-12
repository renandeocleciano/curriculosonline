"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadContainer = void 0;
const awilix_1 = require("awilix");
const awilix_express_1 = require("awilix-express");
const home_service_1 = require("../services/home.service");
const auth_service_1 = require("../services/auth.service");
const session_1 = require("./database/session");
const user_service_1 = require("../services/user.service");
const loadContainer = (app) => {
    const Container = (0, awilix_1.createContainer)({
        injectionMode: "CLASSIC",
    });
    Container.register({
        homeService: (0, awilix_1.asClass)(home_service_1.HomeService).scoped(),
        authService: (0, awilix_1.asClass)(auth_service_1.AuthService).scoped(),
        sessionModule: (0, awilix_1.asClass)(session_1.SessionsModule).scoped(),
        userService: (0, awilix_1.asClass)(user_service_1.UserService).scoped(),
    });
    app.use((0, awilix_express_1.scopePerRequest)(Container));
};
exports.loadContainer = loadContainer;
