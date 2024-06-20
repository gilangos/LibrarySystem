import { MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class AutoresAndPeriodics1701320947993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'autores_peri',
                columns:[
                    {
                        name: 'autorId',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name:'periodicoId',
                        type: 'uuid',
                        isNullable: false
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'autores_peri',
            new TableForeignKey({
                columnNames: ['autorId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'autores_periodicos',
                onDelete: 'CASCADE', 
            })
        );

        await queryRunner.createForeignKey(
            'autores_peri',
            new TableForeignKey({
                columnNames: ['periodicoId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'periodicos',
                onDelete: 'CASCADE', 
            })
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('autores_peri')
        await queryRunner.dropForeignKey('autores_peri', 'periodicoId')
        await queryRunner.dropForeignKey('autores_peri', 'autorId')
    }

}
