import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddColumnLivros1701406584204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'periodicos',
            new TableColumn({
                name: 'autorId',
                type: 'uuid',
                isNullable: true, 
            })
        );

        await queryRunner.createForeignKey(
            'periodicos',
            new TableForeignKey({
                columnNames: ['autorId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'autores_periodicos',
                onDelete: 'CASCADE', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('periodicos', 'autorId')
        await queryRunner.dropForeignKey('periodicos', 'autorId')
    }

}
