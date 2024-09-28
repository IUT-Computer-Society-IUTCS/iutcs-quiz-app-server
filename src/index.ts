import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db';
import { saveUser } from './controllers/authController';
import { fetchQuizzes, saveQuiz } from './controllers/quizController';
import { fetchUsers } from './controllers/userController';
import http from 'http';
import { Server } from 'socket.io';
import socketManager from './sockets/socketManager';
import { quizSubmission } from './controllers/submissionController';

dotenv.config();

const port = process.env.PORT || 3456;
const app = express();


//middlewares
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE'],
    credentials: true,
}))
app.use(express.json());

//init socket
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*'
    }
})

socketManager(io);


connectDB()
.catch(console.dir);

app.post("/save-user", saveUser);
app.post("/add-quiz", saveQuiz);
app.post('/quiz/submission', quizSubmission);


app.get('/all-users', fetchUsers);
app.get('/all-quizzes', fetchQuizzes);

app.get('/', (req, res) => {
    res.json({message: "Iut quiz server is running"});
})
server.listen(port, ()=> {
    console.log(`Server is running on port = ${port}`);
})