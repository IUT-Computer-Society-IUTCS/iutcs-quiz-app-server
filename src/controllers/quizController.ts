import { Request, Response } from "express";
import { createQuiz, getQuizzes, getSingleQuiz, updateQuizData } from "../models/quizDb";
import { ObjectId } from "mongodb";

export const saveQuiz = async (req: Request, res: Response) => {
  const quiz = req.body;
  const result = await createQuiz(quiz);
  return res.status(200).json(result);
};

export const fetchQuizzes = async (req: Request, res: Response) => {
  const result = await getQuizzes();
  return res.status(200).json(result);
};

export const fetchSingleQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSingleQuiz(id);
  return res.status(200).json(result);
};


const calculateQuizFinishTime = (quizDateTime: string, quizTime:string) => {
    const startTime = new Date(quizDateTime);
    const quizTimeInMilliseconds = parseInt(quizTime) * 60 * 1000;
    const finishTime = new Date(startTime.getTime() + quizTimeInMilliseconds);
    return finishTime.toISOString(); 
  };

export const updateQuiz = async (req: Request, res: Response) => {
  const data = req.body;
  const { id, title, description, quizTime, quizDateTime } = data;
  const filter = {_id: new ObjectId(id)};
  const updateDoc = {
    $set: {
        title,
        description,
        quizTime,
        quizDateTime,
        quizFinishTime: calculateQuizFinishTime(quizDateTime, quizTime)
    }
  }
  const options = { upsert: false };

  const result = await updateQuizData(filter, updateDoc, options);
  return res.status(200).json(result);
};
