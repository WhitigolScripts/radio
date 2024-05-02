// Socket.io server
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { Lame } from "node-lame";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

httpServer.listen(5000, () => {
	console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
	res.send("Hello World");
});

io.on("connection", (socket) => {
	console.log("User connected", socket.id);

	socket.on("audioStream", (audioData: any) => {
		socket.broadcast.emit("audioStream", audioData);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});
