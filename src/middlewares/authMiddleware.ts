import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: any;
  }


export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) =>{
    const token = req?.header('Authorization')?.split(" ")[1];

    if(!token) return res.status(401).json({message: "Access denied. No token provided"});
    
    try {
        const secretKey: string = process.env.JWT_SECRET_KEY || 'helloworld';
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid token"})
    }
}
