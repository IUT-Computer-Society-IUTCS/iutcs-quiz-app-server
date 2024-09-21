import { database } from "../config/db";

const quizCollection = database.collection('Quizes');

export const createQuiz = async(quiz:object) => {
    return await quizCollection.insertOne(quiz);
}

