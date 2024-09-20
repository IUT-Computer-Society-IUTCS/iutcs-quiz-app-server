import {MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri:any = process.env.DB_URL;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
})

export const connectDB = async() =>{
    try {
        await client.connect();

        console.log('mongodb connected!');
    } catch (error) {
        console.error(error);
    }
}

export const database = client.db("IUTQuizApp");