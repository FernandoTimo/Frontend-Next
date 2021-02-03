import { socket } from 'sockets/socket';
import fetch from 'node-fetch';

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
    fetch('http://localhost:4000/products', { method: 'post' });
  } catch ({ message }) {
    console.warn(message);
  }
}
