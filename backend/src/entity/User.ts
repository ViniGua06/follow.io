import { IsEmail } from "class-validator";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import Post from "./Post";
import Comment from "./Comment";
import Follower from "./Follower";
import { Tag } from "./Tag";
import { Exclude } from "class-transformer";
import Chat from "./Chat";
import Message from "./Message";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  followers_qt?: number;
  following_qt?: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: true })
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Follower, (follower) => follower.followed)
  followers: Follower[];

  @OneToMany(() => Follower, (follower) => follower.following)
  following: Follower[];

  @ManyToMany(() => Tag, (tag) => tag)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @Exclude()
  hashPassword = async () => {
    this.password = await bcrypt.hash(this.password, 10);
  };
}
