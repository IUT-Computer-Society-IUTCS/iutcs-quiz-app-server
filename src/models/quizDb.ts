import { database } from "../config/db";
import { ObjectId } from "mongodb";

const quizCollection = database.collection('Quizes');

export const createQuiz = async(quiz:object) => {
    return await quizCollection.insertOne(quiz);
}

export const getQuizzes = async () => {
    return await quizCollection.find().sort({quizDateTime: -1}).toArray();
}

export const getSingleQuiz = async(id: string) => {
    return await quizCollection.findOne({_id: new ObjectId(id)});
}


export const updateQuizData = async(filter:object, updateDoc:object, options:object) =>{
    return await quizCollection.updateOne(filter, updateDoc, options);
}

