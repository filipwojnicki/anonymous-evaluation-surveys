import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Args } from '@nestjs/graphql';
import * as crypto from 'crypto';
import { Answer, Question, Response, Token } from '../models';
import { Sequelize } from 'sequelize-typescript';
import { SubmitSurveyResponseInput } from '../dto/submit-survey.input';
import { TextAnswerDto } from '../dto/answer-text.dto';
import { QuestionType } from '../types/question-type.enum';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel(Response)
    private responseModel: typeof Response,
    @InjectModel(Answer)
    private answerModel: typeof Answer,
    @InjectModel(Token)
    private tokenModel: typeof Token,
    private readonly sequelize: Sequelize,
    private readonly configService: ConfigService
  ) {}

  async getTokenDetails(token: string) {
    return await this.tokenModel.findOne({ where: { token } });
  }

  async submitResponse(@Args('data') data: SubmitSurveyResponseInput) {
    const token = await this.getTokenDetails(data.token);

    if (!token) {
      throw new ForbiddenException('Invalid token');
    }

    if (token.isUsed) {
      throw new ForbiddenException('Token already used');
    }

    const anonymousId = crypto
      .createHash('sha256')
      .update(
        data.token +
          token.surveyId +
          this.configService.get('ANONYMOUS_ID_SECRET')
      )
      .digest('hex');

    const existingResponse = await this.responseModel.findOne({
      where: { anonymousId, surveyId: token?.surveyId },
    });

    if (existingResponse) {
      throw new ForbiddenException('You have already answered this questions.');
    }

    return await this.sequelize.transaction(async (t) => {
      const response = await this.responseModel.create(
        { surveyId: token.surveyId, anonymousId },
        { transaction: t }
      );

      await this.tokenModel.update(
        { isUsed: true },
        { where: { id: token.id }, transaction: t }
      );

      await this.answerModel.bulkCreate(
        data.answers.map((answer) => ({
          responseId: response.id,
          questionId: answer.questionId,
          answer: answer.answer,
        })),
        { transaction: t }
      );

      return true;
    });
  }

  async getTextAnswers(questionId: string): Promise<TextAnswerDto[]> {
    const answers = await this.answerModel.findAll({
      where: {
        questionId,
      },
      include: [
        {
          model: Question,
          where: {
            type: QuestionType.TEXT,
          },
          attributes: [],
        },
      ],
      attributes: ['answer'],
    });

    return answers.map((answer) => ({
      text: answer.answer,
    }));
  }
}
