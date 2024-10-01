"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const authController_1 = require("./controllers/authController");
const quizController_1 = require("./controllers/quizController");
const userController_1 = require("./controllers/userController");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const submissionController_1 = require("./controllers/submissionController");
const leaderBoardController_1 = require("./controllers/leaderBoardController");
const updateMarksController_1 = require("./controllers/updateMarksController");
const quizDeleteController_1 = require("./controllers/quizDeleteController");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT || 3456;
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({
    origin: [process.env.ORIGIN, "http://103.82.172.192:3200"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join("public")));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
(0, db_1.connectDB)().catch(console.dir);
app.post("/save-user", authController_1.saveUser);
app.post("/add-quiz", quizController_1.saveQuiz);
app.post("/quiz/submission", submissionController_1.quizSubmission);
app.post("/update-marks", updateMarksController_1.updateMarks);
app.post("/delete-quiz", quizDeleteController_1.deleteQuiz);
app.get("/all-users", userController_1.fetchUsers);
app.get("/all-quizzes", quizController_1.fetchQuizzes);
app.get("/quiz/:id/leaderboard", leaderBoardController_1.fetchLeaderBoard);
app.get("/single-quiz/:id", quizController_1.fetchSingleQuiz);
app.patch("/update-quiz", quizController_1.updateQuiz);
// app.get("/", (req, res) => {
//     res.json({ message: "Iut quiz server is running" });
// });
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../..", "public", "index.html"));
});
// app.get("*", express.static(path.join(__dirname, "../frontend/build")));
server.listen(port, () => {
    console.log(`Server is running on port = ${port}`);
});
