import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddReplyIdColumnToComentsTable1743361065459
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "comments",
      new TableColumn({
        name: "reply_id",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
