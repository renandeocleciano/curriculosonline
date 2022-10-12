"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AuthController = void 0;
const awilix_express_1 = require("awilix-express");
const user_dto_1 = require("../domain/dtos/user.dto");
const class_validator_1 = require("class-validator");
const error_exception_1 = require("../infra/handlers/error-exception");
const error_code_1 = require("../infra/handlers/error-code");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    registeruser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personalInfo = new user_dto_1.PersonalInfo();
                personalInfo.firstName = req.body.firstName;
                personalInfo.lastName = req.body.lastName;
                personalInfo.birthDay = {
                    day: parseInt(req.body.bday),
                    month: parseInt(req.body.bmonth),
                    year: parseInt(req.body.byear),
                };
                const user = new user_dto_1.UserDTOCreateAPI();
                user.email = req.body.email;
                user.password = req.body.password;
                user.personalInfo = personalInfo;
                const errors = yield (0, class_validator_1.validate)(user);
                if (!errors.length) {
                    yield this.authService.registerUser(user);
                    return res.send({ user: user });
                }
                next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ValidationError, errors));
            }
            catch (error) {
                next(new error_exception_1.ErrorException(error_code_1.ErrorCode.AsyncError, error));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = new user_dto_1.UserDTOLoginAPI();
                user.email = email;
                user.password = password;
                const errors = yield (0, class_validator_1.validate)(user);
                if (!errors.length) {
                    const userByEmail = yield this.authService.checkUserByEmail(email);
                    if (userByEmail) {
                        const checkPass = this.authService.passwordMatch(password, userByEmail.password);
                        if (checkPass) {
                            const token = yield this.authService.getAuthToken(userByEmail);
                            req.session.loggedIn = true;
                            req.session.user = userByEmail.personalInfo.firstName;
                            req.session.token = token;
                            return res.send({ token: token });
                        }
                    }
                }
                next(new error_exception_1.ErrorException(error_code_1.ErrorCode.Unauthenticated, errors));
            }
            catch (error) {
                next(new error_exception_1.ErrorException(error_code_1.ErrorCode.AsyncError, error));
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.destroy();
                res.locals.session.destroy();
                return res.send({ logout: true });
            }
            catch (error) {
                next(new error_exception_1.ErrorException(error_code_1.ErrorCode.AsyncError, error));
            }
        });
    }
};
__decorate([
    (0, awilix_express_1.route)("/register"),
    (0, awilix_express_1.POST)()
], AuthController.prototype, "registeruser", null);
__decorate([
    (0, awilix_express_1.route)("/login"),
    (0, awilix_express_1.POST)()
], AuthController.prototype, "login", null);
__decorate([
    (0, awilix_express_1.route)("/logout"),
    (0, awilix_express_1.POST)()
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, awilix_express_1.route)("/auth")
], AuthController);
exports.AuthController = AuthController;
