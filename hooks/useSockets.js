import { socket } from 'sockets/socket';
import { useEffect } from 'react';
/**
 * UseSockets creado para conneccion usando la librería socket.io :D
 * @param {Function} sockets Callback que recive el objeto 'socket' para las conexiones: useSockets( ( socket ) => { socket.on(...) } )
 */
export function useSockets(sockets) {
  useEffect(() => {
    if (sockets instanceof Function) {
      sockets(socket);
    } else {
      throw TypeError('');
    }
  }, []);
  return socket;
}
