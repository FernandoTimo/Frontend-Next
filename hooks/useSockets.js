import { socket } from 'sockets/socket';
import { useEffect } from 'react';
export function useSockets(sockets) {
  useEffect(() => {
    sockets(socket);
  }, []);
  return socket;
}
