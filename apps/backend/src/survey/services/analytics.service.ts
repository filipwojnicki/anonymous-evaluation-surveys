import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  Survey,
  Question,
  Response,
  Answer,
  Token,
  AnswerOption,
} from '../models';
import { Sequelize } from 'sequelize-typescript';
import { SurveyAnalyticsDetailsDto } from '../dto/question-analytics.dto';
import { QuestionType } from '../types/question-type.enum';
import { Op } from 'sequelize';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Survey) private surveyModel: typeof Survey,
    @InjectModel(Question) private questionModel: typeof Question,
    @InjectModel(Response) private responseModel: typeof Response,
    @InjectModel(Answer) private answerModel: typeof Answer,
    @InjectModel(Token) private tokenModel: typeof Token,
    @InjectModel(AnswerOption) private answerOptionModel: typeof AnswerOption
  ) {}

  async getSurveyAnalyticsDetails(
    surveyId: string
  ): Promise<SurveyAnalyticsDetailsDto> {
    const survey = await this.surveyModel.findByPk(surveyId);

    if (!survey) {
      throw new Error('Survey not found');
    }

    const responses = await this.responseModel.count({ where: { surveyId } });
    const tokens = await this.tokenModel.count({ where: { surveyId } });
    const completionRate = tokens > 0 ? (responses / tokens) * 100 : 0;

    const questions = await this.questionModel.findAll({
      where: { surveyId },
      include: [AnswerOption],
    });

    const questionsAnalytics = await Promise.all(
      questions.map(async (question) => {
        const answers = await this.answerModel.findAll({
          where: { questionId: question.id },
          attributes: [
            'answer',
            [Sequelize.fn('COUNT', Sequelize.col('*')), 'count'],
          ],
          group: ['answer'],
        });

        if (question.type === QuestionType.TEXT) {
          return {
            id: question.id,
            text: question.text,
            type: question.type,
            answerFrequency: answers.map((answer) => ({
              text: answer.answer,
              count: Number(answer.get('count')),
              percentage: (Number(answer.get('count')) / responses) * 100,
            })),
          };
        }

        const optionIds = new Set(
          answers.flatMap((answer) => answer.answer.split(','))
        );

        const answerOptions = await this.answerOptionModel.findAll({
          where: { id: { [Op.in]: Array.from(optionIds) } },
        });

        const optionCounts = answers.reduce((acc, answer) => {
          const ids = answer.answer.split(',');
          ids.forEach((id) => {
            acc[id] = (acc[id] || 0) + 1;
          });
          return acc;
        }, {} as Record<string, number>);

        return {
          id: question.id,
          text: question.text,
          type: question.type,
          answerFrequency: answerOptions.map((option) => ({
            text: option.text,
            count: optionCounts[option.id] || 0,
            percentage: ((optionCounts[option.id] || 0) / responses) * 100,
          })),
        };
      })
    );

    return {
      id: survey.id,
      title: survey.title,
      responses,
      completionRate,
      questions: questionsAnalytics,
    };
  }
}
