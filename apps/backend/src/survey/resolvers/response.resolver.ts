import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ResponseService } from './../services/response.service';
import { SubmitSurveyResponseInput } from '../dto/submit-survey.input';

@Resolver(() => Boolean)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Mutation(() => Boolean)
  async submitResponse(@Args('data') data: SubmitSurveyResponseInput) {
    return this.responseService.submitResponse(data);
  }
}
