import {Request, Response} from 'express'
import { database } from '../config/db';
import { ObjectId } from 'mongodb';

const submissionCollection = database.collection('submissions');
const quizCollection = database.collection('Quizes');

export const quizSubmission = async(req: Request, res: Response) => {
    const data = req.body;
    const {userName, userEmail, quizId, selectedAnswers, submissionTime} = data;
    const quiz = await quizCollection.findOne({_id: new ObjectId(quizId)});
    const questions = quiz?.questions;

    let marks = 0;
    questions.map((q:any, idx:any) => {
        if(q.correctAnswer == selectedAnswers[idx]){
            marks ++;
        }
    })

    console.log(marks);

    const result = await submissionCollection.insertOne({userName, userEmail, quizId, marks, submissionTime});
    res.send(result);
    
}