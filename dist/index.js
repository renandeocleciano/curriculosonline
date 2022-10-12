"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const awilix_express_1 = require("awilix-express");
const container_1 = require("./api/infra/container");
const dotenv_1 = __importDefault(require("dotenv"));
const error_handler_1 = require("./api/infra/handlers/error-handler");
const mongoose_1 = require("./api/infra/database/mongoose");
const session_1 = require("./api/infra/database/session");
dotenv_1.default.config();
(0, mongoose_1.connect)();
const app = (0, express_1.default)();
const port = process.env.PORT;
new session_1.SessionsModule().config(app);
app.use(express_1.default.json());
(0, container_1.loadContainer)(app);
app.use((0, awilix_express_1.loadControllers)("api/controllers/*.js", { cwd: __dirname }));
app.use(error_handler_1.errorHandler);
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
