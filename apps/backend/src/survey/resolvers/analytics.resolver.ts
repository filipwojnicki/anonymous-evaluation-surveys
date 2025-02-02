import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { AnalyticsService } from '../services/analytics.service';
import { SurveyAnalyticsDetailsDto } from '../dto/question-analytics.dto';

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => SurveyAnalyticsDetailsDto)
  @UseGuards(GqlAuthGuard)
  async getSurveyAnalyticsDetails(@Args('surveyId') surveyId: string) {
    return this.analyticsService.getSurveyAnalyticsDetails(surveyId);
  }
}
