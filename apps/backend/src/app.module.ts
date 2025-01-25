import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        port: Joi.number().default(3000),
        database: {
          host: Joi.string().default('localhost'),
          port: Joi.number().default(5432),
          username: Joi.string(),
          password: Joi.string(),
          database: Joi.string(),
        },
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
