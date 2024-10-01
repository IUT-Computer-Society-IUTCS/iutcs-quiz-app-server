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
exports.getUsers = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
const usersCollection = db_1.database.collection('users');
const createUser = (username, studentId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username,
        studentId,
        email,
        role: (email == 'admin@gmail.com') ? 'admin' : 'student',
        isBanned: false
    };
    return yield usersCollection.insertOne(user);
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersCollection.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersCollection.findOne({ _id: new mongodb_1.ObjectId(userId) });
});
exports.findUserById = findUserById;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersCollection.find().toArray();
});
exports.getUsers = getUsers;
