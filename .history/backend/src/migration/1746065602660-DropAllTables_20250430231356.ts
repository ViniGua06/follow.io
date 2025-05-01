import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAllTables1746065602660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tables = await queryRunner.getTables();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
