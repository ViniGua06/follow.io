import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Message from "./Message";
import { User } from "./User";

@Entity("chats")
class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[];
}

export default Chat;
