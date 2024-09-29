import { Request, Response } from "express";
import { database } from "../config/db";

const submissionCollection = database.collection("submissions");

export const updateMarks = async (req: Request, res: Response) => {
    const { userEmail, quizId, submissionTime } = req.body;
  
    if (!userEmail || !quizId || !submissionTime) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }
  
    try {
      const result = await submissionCollection.updateOne(
        { userEmail, quizId: quizId},
        { $inc: { marks: 1 }, $set: { submissionTime } }
      );
      return res.status(200).json({ success: true, message: "Marks updated", result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  
