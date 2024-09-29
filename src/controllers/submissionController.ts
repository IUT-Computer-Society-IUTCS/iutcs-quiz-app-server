import {Request, Response} from 'express'
import { database } from '../config/db';

const submissionCollection = database.collection('submissions');

export const quizSubmission = async(req: Request, res: Response) => {
    const data = req.body;
    const {userName, userEmail, quizId, submissionTime} = data;

    const isExist = await submissionCollection.findOne({userEmail, quizId});
    if(isExist) return;

    const result = await submissionCollection.insertOne({userName, userEmail, quizId, marks: 0, submissionTime});
    res.send(result);
    
}