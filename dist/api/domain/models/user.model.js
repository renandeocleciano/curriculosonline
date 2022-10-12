"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const jwt_handler_1 = require("../../infra/handlers/jwt-handler");
const Schema = mongoose_1.default.Schema;
function getDecimalNumber(val) {
    return val / 1000;
}
function setDecimalNumber(val) {
    return val * 1000;
}
var schema = new Schema({
    isPremium: { type: Boolean, default: false },
    password: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Boolean, default: true },
    token: { type: String },
    aboutMe: { type: String },
    hasPicture: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    personalInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        cpf: { type: String },
        birthDay: {
            day: { type: Number, required: true },
            month: { type: Number, required: true },
            year: { type: Number, required: true },
        },
    },
    residentialInfo: {
        cep: { type: Number },
        place: { type: String },
        number: { type: Number },
        complement: { type: String },
        neighborhood: { type: String },
        city: { type: String },
        state: { type: String },
    },
    schoolInfo: [
        {
            levelOrName: { type: String },
            institution: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
            description: { type: String },
        },
    ],
    courses: [
        {
            name: { type: String },
            institution: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
            description: { type: String },
        },
    ],
    professionalInfo: [
        {
            company: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
            office: { type: String },
            remuneration: {
                type: Number,
                default: 0,
                get: getDecimalNumber,
                set: setDecimalNumber,
            },
            description: { type: String },
        },
    ],
    skills: [
        {
            skill: { type: String },
            rating: { type: Number },
        },
    ],
    social: {
        facebook: { type: String },
        youtube: { type: String },
        github: { type: String },
        linkedin: { type: String },
        site: { type: String },
    },
    resumes: [
        {
            template: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Templates" },
            downloaded: { type: Boolean, default: false },
        },
    ],
}, {
    toObject: { virtuals: true },
    toJSON: { getters: true },
});
schema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password"))
        return next();
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    next();
});
schema.pre("findOneAndUpdate", function (next) {
    var _a;
    const user = this;
    const salt = bcrypt.genSaltSync(10);
    if (user.password) {
        if (user.isModified("password")) {
            user.password = bcrypt.hashSync(user.password, salt);
        }
        return next();
    }
    const { password } = (_a = user.getUpdate()) === null || _a === void 0 ? void 0 : _a.$set;
    if (password) {
        user._update.password = bcrypt.hashSync(password, salt);
    }
    next();
});
schema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = new jwt_handler_1.JwtHandler().jwtSign(user._id);
        user.token = token;
        yield user.save();
        return token;
    });
};
schema.virtual("imgprofile").get(function () {
    if (this.hasPicture)
        return "/uploads/" + this._id + ".webp";
    else
        return "/images/profile.jpg";
});
schema.virtual("lastJob").get(function () {
    if (!this.professionalInfo.length)
        return {
            remuneration: 0,
            office: "-",
        };
    return this.professionalInfo.slice(-1)[0];
});
module.exports = mongoose_1.default.model("User", schema, "User");
