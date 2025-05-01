import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFollowersTable1746067190093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "followers",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "gen_random_uuid()", // Gera o UUID automaticamente
          },
          {
            name: "following_id", // Campo que referencia o usuário que está seguindo
            type: "uuid",
            isNullable: false,
          },
          {
            name: "followed_id", // Campo que referencia o usuário que está sendo seguido
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at", // Campo para armazenar a data de criação
            type: "timestamp",
            isNullable: false,
            default: "CURRENT_TIMESTAMP", // Define o valor padrão para o campo
          },
        ],
        foreignKeys: [
          {
            columnNames: ["following_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE", // Apaga o relacionamento quando o usuário que segue é excluído
          },
          {
            columnNames: ["followed_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE", // Apaga o relacionamento quando o usuário seguido é excluído
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
