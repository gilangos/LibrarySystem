import { MigrationInterface, QueryRunner,Table } from "typeorm"

export class AutoresLivros1701303652273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "autores_livros",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name:"nome",
                        type: "varchar",
                        isUnique: true,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("autores_livros")
    }

}




