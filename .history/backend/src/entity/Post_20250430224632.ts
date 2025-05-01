import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

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

  @ManyToOne(() => User, (user) => user, { onDelete: "CASCADE" })
  user: string;

  @Column()
  created_at: Date;
}
