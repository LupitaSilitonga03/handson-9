import { ConfigModule, ConfigService } from '@nestjs/config';;
import { DataSource } from 'typeorm';

ConfigModule.forRoot();
const configservice = new ConfigService();

export default new DataSource({
    type: 'postgres',
        host: configservice.get<string>('POSTGRES_HOST'),
        port: configservice.get<string>('POSTGRES_HOST')
          ? configservice.get<number>('POSTGRES_PORT')
          : 5432,
          password: configservice.get<string>('POSTGRES_PASSWORD'),
          username: configservice.get<string>('POSTGRES_USER'),
          database: configservice.get<string>('POSTGRES_DATABASE'),
          migrations: ['dist/migrations/*js'],
          entities: [__dirname + '//*.entity{.ts,.js}'],
          ssl: true
});