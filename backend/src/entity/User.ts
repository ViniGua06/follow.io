import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";

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

  hashPassword = async () => {
    this.password = await bcrypt.hash(this.password, 10);
  };
}
