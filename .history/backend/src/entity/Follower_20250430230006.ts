import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("followers")
export default class Follower {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  following: string;

  @Column({ nullable: false })
  followed: string;
}
