import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import Post from "./Post";
import Comment from "./Comment";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: true })
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column()
  created_at: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  followers: number;
  following: number;

  hashPassword = async () => {
    this.password = await bcrypt.hash(this.password, 10);
  };
}
