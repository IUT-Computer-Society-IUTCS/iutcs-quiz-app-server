import {Request, Response} from 'express'
import { database } from '../config/db';

const submissionCollection = database.collection('submissions');

export const quizSubmission = async(req: Request, res: Response) => {
    const data = req.body;
    const {userName, userEmail, quizId, submissionTime, marks} = data;

    const isExist = await submissionCollection.findOne({userEmail, quizId});
    if(isExist) return console.log('already exist data');

    const result = await submissionCollection.insertOne({userName, userEmail, quizId, marks, submissionTime});
    res.send(result);
    
}