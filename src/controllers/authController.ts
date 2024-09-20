import bcrypt from "bcrypt";
import { createUser, findUserById,findUserByEmail  } from "../models/userDb";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwtUtils";

dotenv.config();

export const saveUser = async(req: Request, res: Response) => {
  const {email, username, studentId} = req.body;

  const isExist = await findUserByEmail({email});
  if(isExist) return res.json({message: "User already exists"});

  await createUser(username, studentId, email);
  return res.status(200).json({message: `User info saved on Db`});
}


