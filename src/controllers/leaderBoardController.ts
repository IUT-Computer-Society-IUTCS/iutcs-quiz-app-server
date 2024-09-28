import { Request, Response } from "express";
import { database } from "../config/db";
import { ObjectId } from "mongodb";

const submissionCollection = database.collection("submissions");

export const fetchLeaderBoard = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await submissionCollection
    .find({ quizId: id })
    .sort({ marks: -1, submissionTime: 1 })
    .toArray();
  res.send(result);
};
