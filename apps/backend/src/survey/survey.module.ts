import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnswerOption, Question, Response, Survey } from './models';
import { Token } from './models/token.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AnswerOption,
      Question,
      Response,
      Survey,
      Token,
    ]),
  ],
})
export class SurveyModule {}
