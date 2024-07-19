import { config } from 'dotenv';
import * as path from 'node:path';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  migrations: [path.join(__dirname, 'migrations/*.js')],
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  migrationsTableName: 'migrations',
  logging: true,
});
