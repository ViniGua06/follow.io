import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCommentsTable1746066298441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "gen_random_uuid()",
          },
          {
            name: "text",
            type: "text",
            isNullable: false,
          },
          {
            name: "postId",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "userId",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "reply_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["postId"],
            referencedTableName: "posts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["userId"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["reply_id"],
            referencedTableName: "comments",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
