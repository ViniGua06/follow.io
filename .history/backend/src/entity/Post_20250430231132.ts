import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import Comment from "./Comment";

@Entity("posts")
export default class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment)
  comments: Comment[];

  @Column()
  created_at: Date;
}
