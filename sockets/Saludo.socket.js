import { socket } from 'sockets/Index.socket';

export default function WelcomeSockets(setserverSockets, setmessages) {
  try {
    socket.on('server', (server) => {
      setserverSockets(server);
    });
    socket.on('saludo', (saludo) => {
      setmessages(saludo);
    });
  } catch ({ message }) {
    console.warn(message);
  }
}
export function handlerSocketChat() {
  try {
    socket.emit('saludar', { message: 'Hola a todos :D' });
  } catch ({ message }) {
    console.warn(message);
  }
}
