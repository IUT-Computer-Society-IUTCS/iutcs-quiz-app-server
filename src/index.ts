import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db';
import { saveUser } from './controllers/authController';
import { fetchQuizzes, saveQuiz } from './controllers/quizController';
import { fetchUsers } from './controllers/userController';

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


connectDB()
.catch(console.dir);

app.post("/save-user", saveUser);
app.post("/add-quiz", saveQuiz);


app.get('/all-users', fetchUsers);
app.get('/all-quizzes', fetchQuizzes);

app.get('/', (req, res) => {
    res.json({message: "Iut quiz server is running"});
})
app.listen(port, ()=> {
    console.log(`Server is running on port = ${port}`);
})