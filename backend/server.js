import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

// health checking apis
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is healthy", success: true });
});
app.get("/health", (req, res) => {
  res.status(200).json({ message: "ok", success: true });
});

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
