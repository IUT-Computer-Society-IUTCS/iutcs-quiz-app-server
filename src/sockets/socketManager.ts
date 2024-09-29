
import { Server, Socket } from 'socket.io';
import socketController from '../controllers/socketController';

const socketManager = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    // console.log('A user connected:', socket.id);

    socketController.handleConnection(socket);

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
      } else {
        clearInterval(intervalId);
        io.emit('timer', 0); // Send 0 when the countdown ends
      }
    }, 1000);

    socket.on('disconnect', () => {
      socketController.handleDisconnection(socket);
    });
  });
};

export default socketManager;
