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
exports.updateQuizData = exports.getSingleQuiz = exports.getQuizzes = exports.createQuiz = void 0;
const db_1 = require("../config/db");
const mongodb_1 = require("mongodb");
const quizCollection = db_1.database.collection('Quizes');
const createQuiz = (quiz) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quizCollection.insertOne(quiz);
});
exports.createQuiz = createQuiz;
const getQuizzes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield quizCollection.find().sort({ quizDateTime: -1 }).toArray();
});
exports.getQuizzes = getQuizzes;
const getSingleQuiz = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quizCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
});
exports.getSingleQuiz = getSingleQuiz;
const updateQuizData = (filter, updateDoc, options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quizCollection.updateOne(filter, updateDoc, options);
});
exports.updateQuizData = updateQuizData;
