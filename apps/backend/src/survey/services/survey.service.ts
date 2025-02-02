import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { AnswerOption, Question, Response, Survey, Token } from '../models';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { User } from '../../user/models';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { SurveyAnalyticsDto } from '../dto/survey-analytics.dto';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(
    @InjectModel(Survey)
    private surveyModel: typeof Survey,
    @InjectModel(Token)
    private tokenModel: typeof Token,
    @InjectModel(Response)
    private responseModel: typeof Response
  ) {}

  async createSurvey(data: CreateSurveyDto, userId: User['id']) {
    this.logger.debug(`Creating survey for user ${userId}`);
    const survey = await this.surveyModel.create({
      ...data,
      creatorId: userId,
    });

    const tokens = [];
    for (let i = 0; i < data.tokenCount; i++) {
      tokens.push({
        token: uuidv4(),
        surveyId: survey.id,
      });
    }
    await this.tokenModel.bulkCreate(tokens);

    return survey;
  }

  async isCreator(surveyId: Survey['id'], userId: User['id']) {
    const survey = await this.surveyModel.findOne({
      where: { id: surveyId, creatorId: userId },
    });
    if (!survey) {
      throw new NotFoundException('Survey not found');
    }
    return survey.creatorId === userId;
  }

  async getSurveysByCreator(userId: User['id']) {
    return this.surveyModel.findAll({
      where: {
        creatorId: userId,
      },
    });
  }

  async getSurveysAnalytics(userId: string) {
    const surveys = await this.surveyModel.findAll({
      where: { creatorId: userId },
    });

    return Promise.all(
      surveys.map(async (survey) => {
        const [responses, tokens] = await Promise.all([
          this.responseModel.count({ where: { surveyId: survey.id } }),
          this.tokenModel.count({ where: { surveyId: survey.id } }),
        ]);

        return {
          id: survey.id,
          title: survey.title,
          responses,
          completionRate: tokens > 0 ? (responses / tokens) * 100 : 0,
        };
      })
    ) as Promise<SurveyAnalyticsDto[]>;
  }

  async getSurvey(surveyId: Survey['id'], userId: User['id']) {
    const survey = await this.surveyModel.findOne({
      where: { id: surveyId, creatorId: userId },
    });
    if (!survey) {
      throw new NotFoundException('Survey not found');
    }
    return survey;
  }

  async findByToken(token: string) {
    const tokenData = await this.tokenModel.findOne({ where: { token } });

    if (!tokenData) {
      throw new ForbiddenException('Invalid token');
    }

    if (tokenData?.isUsed) {
      throw new ForbiddenException('Token already used');
    }

    const survey = await this.surveyModel.findOne({
      where: { id: tokenData.surveyId },
      include: [
        {
          model: Question,
          include: [AnswerOption],
        },
      ],
    });

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }

  async updateSurvey(
    surveyId: Survey['id'],
    data: UpdateSurveyDto,
    userId: User['id']
  ) {
    const survey = await this.getSurvey(surveyId, userId);

    if (survey.creatorId !== userId) {
      throw new ForbiddenException('Not authorized to update this survey');
    }

    await survey.update(data);
    return survey;
  }

  async getSurveyTokens(surveyId: Survey['id']) {
    return await this.tokenModel.findAll({
      where: { surveyId, isUsed: false },
    });
  }

  async deleteSurvey(surveyId: Survey['id'], userId: User['id']) {
    try {
      const survey = await this.surveyModel.findOne({
        where: { id: surveyId, creatorId: userId },
      });

      if (!survey) {
        throw new NotFoundException('Survey not found');
      }

      if (survey.creatorId !== userId) {
        throw new ForbiddenException('Not authorized to delete this survey');
      }

      await survey.destroy();
      return true;
    } catch {
      return false;
    }
  }
}
