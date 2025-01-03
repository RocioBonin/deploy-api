import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenvConfig({ path: '.env.development'});

const config = {
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    synchronize: true,
    logging: false,
}

export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions)