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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = void 0;
const userDb_1 = require("../models/userDb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, studentId } = req.body;
    const isExist = yield (0, userDb_1.findUserByEmail)({ email });
    if (isExist)
        return res.json({ message: "User already exists" });
    yield (0, userDb_1.createUser)(username, studentId, email);
    return res.status(200).json({ message: `User info saved on Db` });
});
exports.saveUser = saveUser;
