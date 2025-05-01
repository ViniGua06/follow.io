import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments")
export default class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  post_id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  reply_id?: string;

  @Column()
  created_at: Date;
}
