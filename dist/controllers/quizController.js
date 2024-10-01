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
exports.updateQuiz = exports.fetchSingleQuiz = exports.fetchQuizzes = exports.saveQuiz = void 0;
const quizDb_1 = require("../models/quizDb");
const mongodb_1 = require("mongodb");
const saveQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = req.body;
    const result = yield (0, quizDb_1.createQuiz)(quiz);
    return res.status(200).json(result);
});
exports.saveQuiz = saveQuiz;
const fetchQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, quizDb_1.getQuizzes)();
    return res.status(200).json(result);
});
exports.fetchQuizzes = fetchQuizzes;
const fetchSingleQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, quizDb_1.getSingleQuiz)(id);
    return res.status(200).json(result);
});
exports.fetchSingleQuiz = fetchSingleQuiz;
const calculateQuizFinishTime = (quizDateTime, quizTime) => {
    const startTime = new Date(quizDateTime);
    const quizTimeInMilliseconds = parseInt(quizTime) * 60 * 1000;
    const finishTime = new Date(startTime.getTime() + quizTimeInMilliseconds);
    return finishTime.toISOString();
};
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id, title, description, quizTime, quizDateTime } = data;
    const filter = { _id: new mongodb_1.ObjectId(id) };
    const updateDoc = {
        $set: {
            title,
            description,
            quizTime,
            quizDateTime,
            quizFinishTime: calculateQuizFinishTime(quizDateTime, quizTime)
        }
    };
    const options = { upsert: false };
    const result = yield (0, quizDb_1.updateQuizData)(filter, updateDoc, options);
    return res.status(200).json(result);
});
exports.updateQuiz = updateQuiz;
