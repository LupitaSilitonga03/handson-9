import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get<string>('POSTGRES_HOST'),
        port: ConfigService.get<string>('POSTGRES_HOST')
          ? ConfigService.get<number>('POSTGRES_PORT')
          : 5432,
          password: ConfigService.get<string>('POSTGRES_PASSWORD'),
          username: ConfigService.get<string>('POSTGRES_USER'),
          database: ConfigService.get<string>('POSTGRES_DATABASE'),
          migrations: ['dist/migrations/*js'],
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          ssl: true
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}