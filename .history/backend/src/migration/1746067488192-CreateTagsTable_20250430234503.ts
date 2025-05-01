import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTagsTable1746067488192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tags",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "gen_random_uuid()",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "color",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
