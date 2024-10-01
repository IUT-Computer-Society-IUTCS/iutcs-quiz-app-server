"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Access denied. No token provided" });
    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'helloworld';
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
