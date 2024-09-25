
import { Server, Socket } from 'socket.io';
import socketController from '../controllers/socketController';

const socketManager = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    socketController.handleConnection(socket);

    socket.on('disconnect', () => {
      socketController.handleDisconnection(socket);
    });
  });
};

export default socketManager;
