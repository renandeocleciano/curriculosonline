"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const user_service_1 = require("../../services/user.service");
const jwt_handler_1 = require("../handlers/jwt-handler");
const logger_1 = require("./logger");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.session.token;
        if (!token || token == null)
            return res.status(403).json({ acessoNegado: true });
        const _token = new jwt_handler_1.JwtHandler().jwtVerify(token);
        if (_token && _token != null) {
            const user = yield new user_service_1.UserService().getByIdAndToken(_token._id, token);
            if (!user)
                return res.status(403).json({ acessoNegado: true });
        }
    }
    catch (error) {
        logger_1.logger.error(error);
        return res.status(403).json({ acessoNegado: true });
    }
    next();
});
exports.authenticate = authenticate;
