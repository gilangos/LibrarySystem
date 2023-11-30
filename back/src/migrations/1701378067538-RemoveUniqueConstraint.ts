import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class RemoveUniqueConstraint1701378067538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("autores_livros", "nome", new TableColumn({name: "nome", type: "varchar"}))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("autores_livros", "nome", new TableColumn({name: "nome", type: "varchar", isUnique: true}))
    }

}
