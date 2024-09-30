import {Request, Response} from 'express'
import { createQuiz, getQuizzes, getSingleQuiz } from '../models/quizDb';

export const saveQuiz = async (req: Request, res: Response) =>{
    const quiz = req.body;
    const result = await createQuiz(quiz);
    return res.status(200).json(result);
}

export const fetchQuizzes = async(req: Request, res: Response) => {
    const result = await getQuizzes();
    return res.status(200).json(result);
}


export const fetchSingleQuiz = async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await getSingleQuiz(id);
    return res.status(200).json(result);
}