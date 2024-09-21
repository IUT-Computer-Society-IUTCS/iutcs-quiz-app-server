import { ObjectId } from 'mongodb';
import { database } from '../config/db';

const usersCollection = database.collection('users');


export const createUser = async (username: string, studentId: number, email: string) => {
    const user = {
        username,
        studentId,
        email,
        role: (email == 'admin@gmail.com') ? 'admin' : 'student',
    }
    return await usersCollection.insertOne(user);
};

export const findUserByEmail = async (email: any) => {
    return await usersCollection.findOne({ email });
};

export const findUserById = async (userId: string) => {
    return await usersCollection.findOne({ _id: new ObjectId(userId) });
};


export const getUsers = async () => {
    return await usersCollection.find().toArray();
}
