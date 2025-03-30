import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("followers")
export default class Follower {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  following: string;

  @Column({ nullable: false })
  followed: string;
}
