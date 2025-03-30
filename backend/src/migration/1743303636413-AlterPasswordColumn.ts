import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterPasswordColumn1743303636413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "password",
      new TableColumn({
        name: "password",
        type: "varchar",
        isUnique: false,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
