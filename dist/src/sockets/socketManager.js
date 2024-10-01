"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketController_1 = __importDefault(require("../controllers/socketController"));
const socketManager = (io) => {
    io.on('connection', (socket) => {
        // console.log('A user connected:', socket.id);
        socketController_1.default.handleConnection(socket);
        socket.on('requestTime', () => {
            const currentTime = new Date().toISOString();
            socket.emit('currentTime', currentTime);
        });
        let countDownTime = 60 * 5;
        socket.emit('timer', countDownTime);
        const intervalId = setInterval(() => {
            if (countDownTime > 0) {
                countDownTime--;
                io.emit('timer', countDownTime);
            }
            else {
                clearInterval(intervalId);
                io.emit('timer', 0); // Send 0 when the countdown ends
            }
        }, 1000);
        socket.on('disconnect', () => {
            socketController_1.default.handleDisconnection(socket);
        });
    });
};
exports.default = socketManager;
