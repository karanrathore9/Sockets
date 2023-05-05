import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const app = express();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("What is Socket : ", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload) => {
        console.log("What is payload : ", payload);
        io.emit("chat", payload);
    });
});

httpServer.listen(5000, () => {
    console.log("Server is listening at port 5000...");
});