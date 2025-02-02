import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateQuestionInput } from '../dto/create-question.input';
import { AnswerOption, Question, type Survey } from '../models';
import { QuestionType } from '../types/question-type.enum';
import { UpdateQuestionInput } from '../dto/update-question.input';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question)
    private readonly questionModel: typeof Question,
    @InjectModel(AnswerOption)
    private readonly answerOptionModel: typeof AnswerOption,
    private sequelize: Sequelize
  ) {}

  async createQuestion(data: CreateQuestionInput) {
    const needsOptions = [
      QuestionType.SINGLE_CHOICE,
      QuestionType.MULTIPLE_CHOICE,
    ].includes(data.type);

    return await this.sequelize.transaction(async (t) => {
      const question = await this.questionModel.create(
        {
          surveyId: data.surveyId,
          text: data.text,
          type: data.type,
        },
        { transaction: t }
      );

      if (needsOptions && data.answerOptions?.length) {
        await this.answerOptionModel.bulkCreate(
          data.answerOptions.map((option) => ({
            questionId: question.id,
            text: option.text,
          })),
          { transaction: t }
        );
      }

      return true;
    });
  }

  async updateQuestion(
    questionId: Question['id'],
    surveyId: Survey['id'],
    data: UpdateQuestionInput
  ) {
    return await this.sequelize
      .transaction(async (t) => {
        const question = await this.getQuestionById(questionId, surveyId);

        await question.update(
          {
            text: data.text ?? question.text,
            type: data.type ?? question.type,
          },
          { transaction: t }
        );

        if (data.answerOptions) {
          await this.answerOptionModel.destroy({
            where: { questionId },
            transaction: t,
          });

          if (data.answerOptions.length > 0) {
            await this.answerOptionModel.bulkCreate(
              data.answerOptions.map((option) => ({
                questionId,
                text: option.text,
              })),
              { transaction: t }
            );
          }
        }

        return true;
      })
      .catch(() => false);
  }

  async getQuestions(surveyId: Survey['id']) {
    return await this.questionModel.findAll({
      where: { surveyId },
      include: [AnswerOption],
    });
  }

  async getQuestionById(questionId: Question['id'], surveyId: Survey['id']) {
    const question = await this.questionModel.findOne({
      where: { id: questionId, surveyId },
      include: [AnswerOption],
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async deleteQuestion(questionId: Question['id'], surveyId: Survey['id']) {
    const question = await this.getQuestionById(questionId, surveyId);
    await question.destroy();
    return true;
  }
}
