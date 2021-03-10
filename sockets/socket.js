import io from 'socket.io-client';
const BASEURL = 'http://localhost:4000';
// const BASEURL = 'http://10.0.2.2:4000';
export const socket = io(BASEURL);
