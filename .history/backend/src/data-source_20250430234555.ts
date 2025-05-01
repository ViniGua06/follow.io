import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { CreateusersTable1743296790413 } from "./migration/1743296790413-CreateusersTable";
import Post from "./entity/Post";
import dotenv from "dotenv";
import Comment from "./entity/Comment";
import Follower from "./entity/Follower";
import { Tag } from "./entity/Tag";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "postgres",
  synchronize: false,
  logging: true,
  entities: [User, Post, Comment, Follower, Tag],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
