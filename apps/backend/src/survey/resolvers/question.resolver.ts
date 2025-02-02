import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ForbiddenException, Logger, UseGuards } from '@nestjs/common';
import { CreateQuestionInput } from '../dto/create-question.input';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import { QuestionService } from '../services/question.service';
import { SurveyService } from '../services/survey.service';
import { QuestionDto } from '../dto/question.dto';
import type { Payload } from '../../auth/auth.strategy';
import { Question, Survey } from '../models';
import { UpdateQuestionInput } from '../dto/update-question.input';

@Resolver(() => QuestionDto)
export class QuestionResolver {
  private readonly logger = new Logger(QuestionResolver.name);

  constructor(
    private readonly questionService: QuestionService,
    private readonly surveyService: SurveyService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async createQuestion(
    @Args('data') data: CreateQuestionInput,
    @CurrentUser() user: Payload
  ) {
    const isCreator = await this.surveyService.isCreator(
      data.surveyId,
      user.userId
    );

    if (!isCreator) {
      throw new ForbiddenException(
        'You are not allowed to create questions for this survey.'
      );
    }

    return await this.questionService.createQuestion(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async updateQuestion(
    @Args('questionId', { type: () => String }) questionId: Question['id'],
    @Args('surveyId', { type: () => String }) surveyId: Survey['id'],
    @Args('data', { type: () => UpdateQuestionInput })
    data: UpdateQuestionInput,
    @CurrentUser() user: Payload
  ) {
    this.logger.debug(
      `Updating question with id: ${questionId} for survey: ${surveyId}`
    );
    const question = await this.questionService.getQuestionById(
      questionId,
      surveyId
    );
    this.logger.debug(`Question found: ${question.text}`);
    const isCreator = await this.surveyService.isCreator(
      question.surveyId,
      user.userId
    );

    this.logger.debug(`Is creator: ${isCreator}`);
    if (!isCreator) {
      throw new ForbiddenException(
        'You are not allowed to update this question.'
      );
    }

    return await this.questionService.updateQuestion(
      questionId,
      surveyId,
      data
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteQuestion(
    @Args('questionId', { type: () => String }) questionId: Question['id'],
    @Args('surveyId', { type: () => String }) surveyId: Survey['id'],
    @CurrentUser() user: Payload
  ) {
    const question = await this.questionService.getQuestionById(
      questionId,
      surveyId
    );
    const isCreator = await this.surveyService.isCreator(
      question.surveyId,
      user.userId
    );

    if (!isCreator) {
      throw new ForbiddenException(
        'You are not allowed to delete questions for this survey.'
      );
    }

    return await this.questionService.deleteQuestion(questionId, surveyId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [QuestionDto])
  async getQuestions(
    @Args('surveyId', { type: () => String }) surveyId: Survey['id'],
    @CurrentUser() user: Payload
  ) {
    const isCreator = await this.surveyService.isCreator(surveyId, user.userId);

    if (!isCreator) {
      throw new ForbiddenException(
        'You are not allowed to view questions for this survey.'
      );
    }

    return await this.questionService.getQuestions(surveyId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => QuestionDto)
  async getQuestion(
    @Args('questionId', { type: () => String }) questionId: Question['id'],
    @Args('surveyId', { type: () => String }) surveyId: Survey['id'],
    @CurrentUser() user: Payload
  ) {
    const question = await this.questionService.getQuestionById(
      questionId,
      surveyId
    );
    const isCreator = await this.surveyService.isCreator(
      question.surveyId,
      user.userId
    );

    if (!isCreator) {
      throw new ForbiddenException(
        'You are not allowed to view this question.'
      );
    }

    return question;
  }
}
