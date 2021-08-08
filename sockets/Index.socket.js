import io from 'socket.io-client';
const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
export const socket = io(BASEURL);
