import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ResponseService } from './../services/response.service';
import { SubmitSurveyResponseInput } from '../dto/submit-survey.input';
import { TextAnswerDto } from '../dto/answer-text.dto';

@Resolver(() => Boolean)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Mutation(() => Boolean)
  async submitResponse(@Args('data') data: SubmitSurveyResponseInput) {
    return this.responseService.submitResponse(data);
  }

  @Query(() => [TextAnswerDto])
  async getTextAnswers(@Args('questionId') questionId: string) {
    return this.responseService.getTextAnswers(questionId);
  }
}
