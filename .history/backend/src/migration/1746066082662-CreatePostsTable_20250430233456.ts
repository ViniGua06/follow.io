import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostsTable1746066082662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "gen_random_uuid()",
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "content",
            type: "text",
            isNullable: false,
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "userId",
            type: "uuid",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
