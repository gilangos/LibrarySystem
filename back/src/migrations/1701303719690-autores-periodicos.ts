import { MigrationInterface, QueryRunner ,Table} from "typeorm"

export class AutoresPeriodicos1701303719690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "autores_periodicos",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name:"nome",
                        type: "varchar",
                    },
            
                ]
            })
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("autores_periodicos")
    }

}
