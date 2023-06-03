import { io } from "socket.io-client";
const serverAppOrigin =
  process.env.NODE_ENV === "production"
    ? "https://tune-teaser-server.onrender.com"
    : "http://localhost:3001";
const socket = io.connect(serverAppOrigin);
export default socket;
