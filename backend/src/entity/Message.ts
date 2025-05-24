import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import Chat from "./Chat";

@Entity("messages")
class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}

export default Message;
