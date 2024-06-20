import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddRelation1701241288444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'livros',
            new TableColumn({
                name: 'usuarioId',
                type: 'uuid',
                isNullable: true, 
            })
        );

        await queryRunner.createForeignKey(
            'livros',
            new TableForeignKey({
                columnNames: ['usuarioId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'CASCADE', 
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('livros', 'usuarioId');
        await queryRunner.dropColumn('livros', 'usuarioId');
    }

}
