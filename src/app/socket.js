import { io } from "socket.io-client";
const serverAppOrigin =
  process.env.NODE_ENV === "production"
    ? "https://tune-teaser-server.onrender.com"
    : "http://localhost:3001";

console.log("🚀 ~ file: socket.js:3 ~ serverAppOrigin:", serverAppOrigin);
const socket = io.connect(serverAppOrigin);
export default socket;
