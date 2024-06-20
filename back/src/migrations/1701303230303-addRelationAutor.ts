import { MigrationInterface, QueryRunner ,TableColumn, TableForeignKey} from 'typeorm'

export class AddRelationAutor1701303230303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'livros',
            new TableColumn({
                name: 'autorId',
                type: 'uuid',
                isNullable: true, 
            })
        );

        await queryRunner.createForeignKey(
            'livros',
            new TableForeignKey({
                columnNames: ['autorId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'autores_livros',
                onDelete: 'CASCADE', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('livros', 'autorId')
        await queryRunner.dropForeignKey('livros', 'autorId')
    }

}
