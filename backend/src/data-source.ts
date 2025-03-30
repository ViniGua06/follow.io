import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { CreateusersTable1743296790413 } from "./migration/1743296790413-CreateusersTable";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "postgres",
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: ["build/migration/**/*.js"],
  subscribers: [],
});
