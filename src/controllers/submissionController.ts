import {Request, Response} from 'express'
import { database } from '../config/db';
import { ObjectId } from 'mongodb';

const submissionCollection = database.collection('submissions');
const quizCollection = database.collection('Quizes');

export const quizSubmission = async(req: Request, res: Response) => {
    const data = req.body;
    const {userName, userEmail, quizId, selectedAnswers} = data;
    const quiz = await quizCollection.findOne({_id: new ObjectId(quizId)});
    const questions = quiz?.questions;

    console.log({questions, selectedAnswers});
}