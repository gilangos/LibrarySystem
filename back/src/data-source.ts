import "reflect-metadata"

import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 3040,
        username: 'postgres',
        password: 'gilax',
        database: 'library',
        entities: ['src/Entities/*.{ts,js}'],
        migrations: ['src/migrations/*.{ts,js}'],
})

