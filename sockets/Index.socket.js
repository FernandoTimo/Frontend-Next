import io from 'socket.io-client';
const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
// const BASEURL = 'http://10.0.2.2:4000';
export const socket = io(BASEURL);
