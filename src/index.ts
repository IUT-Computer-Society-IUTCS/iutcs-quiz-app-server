import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { saveUser } from "./controllers/authController";
import {
    fetchQuizzes,
    fetchSingleQuiz,
    saveQuiz,
    updateQuiz,
} from "./controllers/quizController";
import { fetchUsers } from "./controllers/userController";
import http from "http";
import { Server } from "socket.io";
import { quizSubmission } from "./controllers/submissionController";
import { fetchLeaderBoard } from "./controllers/leaderBoardController";
import { updateMarks } from "./controllers/updateMarksController";
import { deleteQuiz } from "./controllers/quizDeleteController";
import path from "path";

dotenv.config();

const port = process.env.PORT || 3456;
const app = express();

//middlewares
app.use(
    cors({
        origin: [process.env.ORIGIN as string, "http://103.82.172.192:3200"],
        methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.static(path.join("public")));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

connectDB().catch(console.dir);

app.post("/save-user", saveUser);
app.post("/add-quiz", saveQuiz);
app.post("/quiz/submission", quizSubmission);
app.post("/update-marks", updateMarks);
app.post("/delete-quiz", deleteQuiz);

app.get("/all-users", fetchUsers);
app.get("/all-quizzes", fetchQuizzes);
app.get("/quiz/:id/leaderboard", fetchLeaderBoard);
app.get("/single-quiz/:id", fetchSingleQuiz);

app.patch("/update-quiz", updateQuiz);

// app.get("/", (req, res) => {
//     res.json({ message: "Iut quiz server is running" });
// });

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../..", "public", "index.html"));
});
// app.get("*", express.static(path.join(__dirname, "../frontend/build")));

server.listen(port, () => {
    console.log(`Server is running on port = ${port}`);
});
