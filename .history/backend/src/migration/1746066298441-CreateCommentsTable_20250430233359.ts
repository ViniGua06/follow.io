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
            default: "CURRENT_TIMESTAMP", // Para garantir que a data seja gerada automaticamente
          },
        ],
        foreignKeys: [
          {
            columnNames: ["postId"],
            referencedTableName: "posts", // Certifique-se de que a tabela "posts" existe
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["userId"],
            referencedTableName: "users", // Certifique-se de que a tabela "users" existe
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["reply_id"],
            referencedTableName: "comments", // Referencia a própria tabela de comentários
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
