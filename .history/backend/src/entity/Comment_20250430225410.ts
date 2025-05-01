import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("comments")
export default class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  post_id: string;

  @ManyToOne(() => User, (user) => user.c)
  user: User;

  @Column({ nullable: false })
  reply_id?: string;

  @Column()
  created_at: Date;
}
