
import { Socket } from 'socket.io';

interface ExtendedSocket extends Socket {
  intervalId?: NodeJS.Timeout;
}

const handleConnection = (socket: ExtendedSocket) => {
  console.log('Handling new connection:', socket.id);

  const sendServerTime = () => {
    const currentTime = new Date().toISOString();
    socket.emit('serverTime', currentTime);
  };

  const intervalId = setInterval(sendServerTime, 1000);

  socket.intervalId = intervalId;
};

const handleDisconnection = (socket: ExtendedSocket) => {
  if (socket.intervalId) {
    clearInterval(socket.intervalId);
    console.log('Interval cleared for socket:', socket.id);
  }
  console.log('User disconnected:', socket.id);
};

export default {
  handleConnection,
  handleDisconnection,
};
