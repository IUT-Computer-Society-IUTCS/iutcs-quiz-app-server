import { Request, Response } from "express";
import { database } from "../config/db";

const submissionCollection = database.collection("submission");

export const updateMarks = async (req: Request, res: Response) => {
    const { userEmail, quizId, submissionTime } = req.body;
    try {
      const result = await submissionCollection.updateOne(
        { userEmail, quizId },
        { $inc: { marks: 1 }, submissionTime }
      );
      return res.status(200).json({ success: true, message: "Marks updated", result});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
