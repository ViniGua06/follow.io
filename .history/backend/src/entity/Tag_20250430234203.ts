import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tags" })
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;
}
