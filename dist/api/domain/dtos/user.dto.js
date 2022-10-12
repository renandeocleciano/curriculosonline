"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTOLoginAPI = exports.UserDTOCreateAPI = exports.PersonalInfo = exports.User = void 0;
const class_validator_1 = require("class-validator");
class User {
}
exports.User = User;
class PersonalInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100)
], PersonalInfo.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100)
], PersonalInfo.prototype, "lastName", void 0);
exports.PersonalInfo = PersonalInfo;
class UserDTOCreateAPI {
}
__decorate([
    (0, class_validator_1.IsEmail)()
], UserDTOCreateAPI.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20)
], UserDTOCreateAPI.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)()
], UserDTOCreateAPI.prototype, "personalInfo", void 0);
exports.UserDTOCreateAPI = UserDTOCreateAPI;
class UserDTOLoginAPI {
}
__decorate([
    (0, class_validator_1.IsEmail)()
], UserDTOLoginAPI.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20)
], UserDTOLoginAPI.prototype, "password", void 0);
exports.UserDTOLoginAPI = UserDTOLoginAPI;
