import { MigrationInterface, QueryRunner , Table} from 'typeorm'

export class Periodicos1701303822897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'periodicos',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name:'titulo',
                        type: 'varchar',
                    },
                    {
                        name:'descrição',
                        type: 'varchar'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('periodicos')
    }

}
