import { socket } from 'sockets/socket';

export default function WelcomeSockets(setserverSockets, setmessages) {
  try {
    socket.on('server', (server) => {
      setserverSockets(server);
    });
    socket.on('saludo', (saludo) => {
      let message = messages.messages;
      message.push(saludo);
      setmessages({ messages: message });
    });
  } catch ({ message }) {
    console.warn(message);
  }
}
export function handlerSocketChat() {
  try {
    socket.emit('saludar', { message: 'Hola a todos!' });
  } catch ({ message }) {
    console.warn(message);
  }
}
