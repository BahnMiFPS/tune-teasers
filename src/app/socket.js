import { io } from "socket.io-client";
const serverAppOrigin =
  process.env.NODE_ENV === "production"
    ? "https://tune-teasers.herokuapp.com"
    : "http://localhost:3001";
const socket = io.connect(serverAppOrigin);
export default socket;
