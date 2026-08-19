import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comment } from "./comments/entities/comment.entity";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "/data/sqlite.db",
  entities: [Comment],
  migrations: ["src/migrations/*.ts"],
  synchronize: false, // Absolutely critical to disable this here
});