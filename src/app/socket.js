import { io } from "socket.io-client";
const socket = io.connect("https://tune-teasers.herokuapp.com");
export default socket;
