import {Request, Response} from 'express'
import { createQuiz } from '../models/quizDb';

export const saveQuiz = async (req: Request, res: Response) =>{
    const quiz = req.body;
    const result = await createQuiz(quiz);
    return res.status(200).json(result);
}