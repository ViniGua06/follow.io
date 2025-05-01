import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import Post from "./Post";

@Entity("comments")
export default class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  text: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  post: Post;

  @ManyToOne(() => Comment, { nullable: true, onDelete: "CASCADE" })
  replyTo?: string;

  @Column()
  created_at: Date;
}
