import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostgresSequelizeConfigService } from './service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresSequelizeConfigService,
    }),
  ],
})
export class DatabaseModule {}
