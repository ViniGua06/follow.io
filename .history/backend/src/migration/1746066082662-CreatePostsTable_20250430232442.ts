import { MigrationInterface, QueryRunner } from "typeorm";

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
            default: "gen_random_uuid()", // ou 'uuid_generate_v4()'
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
            name: "userId", // esse é o campo que representa o relacionamento ManyToOne
            type: "uuid",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
