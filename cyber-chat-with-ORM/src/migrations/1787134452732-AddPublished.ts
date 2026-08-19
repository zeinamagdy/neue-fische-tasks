import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPublished1787134452732 implements MigrationInterface {
    name = 'AddPublished1787134452732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" varchar PRIMARY KEY NOT NULL, "threadId" varchar NOT NULL, "author" varchar(120) NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "publishedYear" integer, CONSTRAINT "FK_f7f39dec77c39953338d2701aee" FOREIGN KEY ("threadId") REFERENCES "thread" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "threadId", "author", "body", "createdAt") SELECT "id", "threadId", "author", "body", "createdAt" FROM "comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME TO "temporary_comment"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" varchar PRIMARY KEY NOT NULL, "threadId" varchar NOT NULL, "author" varchar(120) NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_f7f39dec77c39953338d2701aee" FOREIGN KEY ("threadId") REFERENCES "thread" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "comment"("id", "threadId", "author", "body", "createdAt") SELECT "id", "threadId", "author", "body", "createdAt" FROM "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
    }

}
