import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config()

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
  // ssl: { rejectUnauthorized: false },
  synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
  logging: false,
  autoLoadEntities: true
};
export default TypeOrmConfig;
