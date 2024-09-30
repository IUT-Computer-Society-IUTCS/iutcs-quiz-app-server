import {Request, Response} from 'express'
import { database } from '../config/db';
import {ObjectId} from 'mongodb';

const quizCollection = database.collection('Quizes');

export const deleteQuiz = async (req: Request, res: Response) => {
    const {id} = req.body;
    const result = await quizCollection.deleteOne({_id: new ObjectId(id)});
    return res.json(result);
}