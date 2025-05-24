import http from "http";
import { Server } from "socket.io";

export default function SetupWebSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: "*",
    },
  });

  io.on("connect", (socket) => {
    console.log("Conectado", socket.id);

    socket.on("session", (sessionIds: string[]) => {
      sessionIds.forEach((session) => {
        socket.join(session);
      });
    });

    socket.on("messageInput", (content: string, user_id: string) => {
      socket.emit("messageCame", { content: content, user_id: user_id });
    });
  });
}
