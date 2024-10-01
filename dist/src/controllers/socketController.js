"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleConnection = (socket) => {
    // console.log('Handling new connection:', socket.id);
    const sendServerTime = () => {
        const currentTime = new Date().toISOString();
        socket.emit('serverTime', currentTime);
    };
    const intervalId = setInterval(sendServerTime, 1000);
    socket.intervalId = intervalId;
};
const handleDisconnection = (socket) => {
    if (socket.intervalId) {
        clearInterval(socket.intervalId);
        // console.log('Interval cleared for socket:', socket.id);
    }
    // console.log('User disconnected:', socket.id);
};
exports.default = {
    handleConnection,
    handleDisconnection,
};
