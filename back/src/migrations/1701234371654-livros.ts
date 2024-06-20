import { MigrationInterface, QueryRunner , Table} from 'typeorm'

export class Livros1701234371654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'livros',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name:'titulo',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name:'genero',
                        type:'varchar',
                    },
                    {
                        name: 'disponivel',
                        type: 'boolean',
                        default: true,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('livros')
    }

}
