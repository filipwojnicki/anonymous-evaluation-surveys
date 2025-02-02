import { SurveyService } from './../services/survey.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user.decorator';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { SurveyDto } from '../dto/survey.dto';
import type { Payload } from '../../auth/auth.strategy';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { TokenDto } from '../dto/token.dto';
import { SurveyAnalyticsDto } from '../dto/survey-analytics.dto';

@Resolver(() => SurveyDto)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SurveyDto)
  async createSurvey(
    @Args('data') data: CreateSurveyDto,
    @CurrentUser() user: Payload
  ) {
    return await this.surveyService.createSurvey(data, user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteSurvey(@Args('id') id: string, @CurrentUser() user: Payload) {
    return await this.surveyService.deleteSurvey(id, user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SurveyDto)
  async updateSurvey(
    @Args('id') id: string,
    @Args('data') data: UpdateSurveyDto,
    @CurrentUser() user: Payload
  ) {
    return await this.surveyService.updateSurvey(id, data, user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [SurveyDto])
  async getSurveysByUser(@CurrentUser() user: Payload) {
    return await this.surveyService.getSurveysByCreator(user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SurveyDto)
  async getSurvey(@Args('id') id: string, @CurrentUser() user: Payload) {
    const survey = await this.surveyService.getSurvey(id, user.userId);
    if (survey.creatorId !== user.userId) {
      throw new NotFoundException('Survey not found');
    }
    return survey;
  }

  @Query(() => SurveyDto)
  async getSurveyByToken(@Args('token') token: string) {
    return await this.surveyService.findByToken(token);
  }

  @Query(() => [SurveyAnalyticsDto])
  @UseGuards(GqlAuthGuard)
  async getSurveysAnalytics(@CurrentUser() user: Payload) {
    return this.surveyService.getSurveysAnalytics(user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [TokenDto])
  async getSurveyTokens(
    @Args('surveyId') surveyId: string,
    @CurrentUser() user: Payload
  ) {
    const survey = await this.surveyService.getSurvey(surveyId, user.userId);
    if (survey.creatorId !== user.userId) {
      throw new ForbiddenException('Not authorized to view these tokens');
    }
    return await this.surveyService.getSurveyTokens(surveyId);
  }
}
