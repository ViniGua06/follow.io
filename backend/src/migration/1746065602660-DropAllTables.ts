import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAllTables1746065602660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("followers", true);
    await queryRunner.dropTable("comments", true);
    await queryRunner.dropTable("posts", true);
    await queryRunner.dropTable("users", true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
