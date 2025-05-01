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
            default: "gen_random_uuid()", // ou 'uuid_generate_v4()' para PostgreSQL
          },
          {
            name: "text",
            type: "text",
            isNullable: false,
          },
          {
            name: "postId", // Esse é o campo que representa o relacionamento ManyToOne com Post
            type: "uuid",
            isNullable: false,
          },
          {
            name: "userId", // Esse é o campo que representa o relacionamento ManyToOne com User
            type: "uuid",
            isNullable: false,
          },
          {
            name: "reply_id",
            type: "uuid",
            isNullable: true, // A referência ao comentário que está sendo respondido (se houver)
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
