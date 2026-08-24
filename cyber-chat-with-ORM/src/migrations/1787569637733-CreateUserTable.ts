import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1787569637733 implements MigrationInterface {
    name = 'CreateUserTable1787569637733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar(120) NOT NULL, "passwordHash" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "temporary_thread" ("id" varchar PRIMARY KEY NOT NULL, "author" varchar(120), "title" varchar(120) NOT NULL, "body" text(1000) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_thread"("id", "author", "title", "body", "createdAt") SELECT "id", "author", "title", "body", "createdAt" FROM "thread"`);
        await queryRunner.query(`DROP TABLE "thread"`);
        await queryRunner.query(`ALTER TABLE "temporary_thread" RENAME TO "thread"`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" varchar PRIMARY KEY NOT NULL, "threadId" varchar NOT NULL, "author" varchar(120) NOT NULL, "body" text(1000) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "publishedYear" integer, CONSTRAINT "FK_f7f39dec77c39953338d2701aee" FOREIGN KEY ("threadId") REFERENCES "thread" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "threadId", "author", "body", "createdAt", "publishedYear") SELECT "id", "threadId", "author", "body", "createdAt", "publishedYear" FROM "comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME TO "temporary_comment"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" varchar PRIMARY KEY NOT NULL, "threadId" varchar NOT NULL, "author" varchar(120) NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "publishedYear" integer, CONSTRAINT "FK_f7f39dec77c39953338d2701aee" FOREIGN KEY ("threadId") REFERENCES "thread" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "comment"("id", "threadId", "author", "body", "createdAt", "publishedYear") SELECT "id", "threadId", "author", "body", "createdAt", "publishedYear" FROM "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
        await queryRunner.query(`ALTER TABLE "thread" RENAME TO "temporary_thread"`);
        await queryRunner.query(`CREATE TABLE "thread" ("id" varchar PRIMARY KEY NOT NULL, "author" varchar(120), "title" varchar(120) NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "thread"("id", "author", "title", "body", "createdAt") SELECT "id", "author", "title", "body", "createdAt" FROM "temporary_thread"`);
        await queryRunner.query(`DROP TABLE "temporary_thread"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
