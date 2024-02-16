import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = async(): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  });

console.log(databaseConfig);
