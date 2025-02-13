import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { AppService } from './app/app.service';
import { DatabaseModule } from './database/database.module';
import { SurveyModule } from './survey/survey.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import Joi from 'joi';
import config from './config/config';
import { join } from 'path';
import { AppResolver } from './app/app.resolver';

export interface GraphQLContext {
  req: Request;
  res: Response;
}

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
        JWT_SECRET: Joi.string(),
        ANONYMOUS_ID_SECRET: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,

      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: true,
        server: {
          path: '/api/graphql',
        },
        path: '/api/graphql',
        introspection: process.env.NODE_ENV === 'development',
        installSubscriptionHandlers: true,
        subscriptions: {
          'subscriptions-transport-ws': process.env.NODE_ENV === 'development',
        },
        context: ({
          req,
          res,
        }: {
          req: Request;
          res: Response;
        }): GraphQLContext => ({
          req,
          res,
        }),
      }),
    }),
    DatabaseModule,
    SurveyModule,
    AuthModule,
    UserModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
