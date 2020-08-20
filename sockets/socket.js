import io from 'socket.io-client';
const BASEURL = 'http://localhost:4000/';
export const socket = io(BASEURL, { path: '/timoideas' });
