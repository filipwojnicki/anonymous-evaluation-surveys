import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer, AnswerOption, Question, Response, Survey } from './models';
import { Token } from './models/token.model';
import {
  QuestionResolver,
  SurveyResolver,
  ResponseResolver,
  AnalyticsResolver,
} from './resolvers';
import {
  QuestionService,
  SurveyService,
  ResponseService,
  AnalyticsService,
} from './services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AnswerOption,
      Question,
      Response,
      Survey,
      Token,
      Answer,
    ]),
    ConfigModule,
  ],
  providers: [
    QuestionService,
    SurveyService,
    ResponseService,
    AnalyticsService,
    QuestionResolver,
    SurveyResolver,
    ResponseResolver,
    AnalyticsResolver,
  ],
})
export class SurveyModule {}
