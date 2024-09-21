import {Request, Response} from 'express'
import { getUsers } from '../models/userDb'

export const fetchUsers = async (req: Request, res: Response) =>{
    const result = await getUsers();
    res.status(200).json(result);
}