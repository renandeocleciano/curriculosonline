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
exports.UserService = void 0;
const logger_1 = require("../infra/middleware/logger");
const userModel = require("../domain/models/user.model");
class UserService {
    getByIdAndToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({ _id: id, token: token });
            }
            catch (error) {
                logger_1.logger.error(error);
                throw new Error("Erro ao buscar dados.");
            }
        });
    }
    addProfessionalInfo(userId, info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $push: { professionalInfo: info } });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addSchoolInfo(userId, info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $push: { schoolInfo: info } });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addCourse(userId, info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $push: { courses: info } });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndRemove({ _id: id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    removeProfessionalInfo(userId, professionalinfoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $pull: { professionalInfo: { _id: professionalinfoId } } }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    removeSchoolInfo(userId, schoolInfoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $pull: { schoolInfo: { _id: schoolInfoId } } }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    removeCourses(userId, coursesId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $pull: { courses: { _id: coursesId } } }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: props.id }, props, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.find().populate("resumes.template");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({ _id: id });
                //.populate("resumes.template");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({ email: email });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getByCpfOrEmail(cpf, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({
                    $or: [{ email: email }, { cpf: cpf }],
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserService = UserService;
