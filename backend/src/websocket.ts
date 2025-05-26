import http from "http";
import { Server } from "socket.io";
import MessageServices from "./services/message.service";
import Message from "./entity/Message";
import ChatServices from "./services/chat.service";
import UserServices from "./services/user.service";

const messageServices = new MessageServices();
const chatServices = new ChatServices();
const userServices = new UserServices();

export default function SetupWebSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: "*",
    },
  });

  io.on("disconnect", () => {
    console.log("DESCONECTADO");
  });

  io.on("connect", (socket) => {
    console.log("Conectado", socket.id);

    socket.on("session", (data: { sessionIds: string[] }) => {
      const { sessionIds } = data;
      sessionIds.forEach((session) => {
        console.log("Conectando a sessao:", session);
        socket.join(session);
      });
    });

    socket.on(
      "messageInput",
      async (data: { content: string; user_id: string; chat_id: string }) => {
        const { content, user_id, chat_id } = data;

        console.log("esse é o content:", content);
        console.log("esse é o userid:", user_id);
        console.log("esse é o chatid:", chat_id);

        const chat = await chatServices.selectChatById(chat_id);
        const user = await userServices.getUserById(user_id);

        const message: Omit<Message, "id" | "created_at"> = {
          content: content,
          user: user,
          chat: chat,
        };

        const insertedMessage = await messageServices.insertMessage(message);

        io.to(chat_id).emit("messageInserted", { message: insertedMessage });
      }
    );
  });
}
