import { AppDataSource } from "../data-source";
import Message from "../entity/Message";

export default class MessageServices {
  private readonly _message = AppDataSource.getRepository(Message);

  public insertMessage = async (
    message: Omit<Message, "id" | "created_at">
  ): Promise<Message> => {
    const newMessage = await this._message.save(message);
    return newMessage;
  };
}
