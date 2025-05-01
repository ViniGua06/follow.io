import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tags"})
export class Tag {
    @PrimaryGeneratedColumn()
}