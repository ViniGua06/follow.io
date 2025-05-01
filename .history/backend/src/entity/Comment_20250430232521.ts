import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import Post from "./Post";

@Entity("comments")
export default class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  text: string;

  post_id: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  post: Post;

  @Column({ nullable: false })
  reply_id?: string;

  @Column()
  created_at: Date;
}
