import { AppDataSource } from "../data-source";
import Chat from "../entity/Chat";

export default class ChatServices {
  private readonly _chat = AppDataSource.getRepository(Chat);

  public selectAllChats = async () => {
    return await this._chat.find({ relations: ["messages", "users"] });
  };

  public selectChatById = async (id: string) => {
    return await this._chat.findOne({ where: { id: id } });
  };

  public insertChat = async (
    chat: Omit<Chat, "id" | "messages"> // vai dormir??? GAY sbia. vai la dormir vou acabar a logica te mando no zap quando acabar
  ): Promise<Chat> => {
    const insertedChat = await this._chat.save(chat);
    return insertedChat;
  };
}
