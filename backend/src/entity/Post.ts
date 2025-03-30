import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ nullable: false })
  user_id: string;

  @Column()
  created_at: Date;
}
