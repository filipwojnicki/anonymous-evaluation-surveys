import { Field, ObjectType, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class SurveyAnalyticsDetailsDto {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field(() => Int)
  responses!: number;

  @Field(() => Float)
  completionRate!: number;

  @Field(() => [QuestionAnalyticsDto])
  questions!: QuestionAnalyticsDto[];
}

@ObjectType()
export class QuestionAnalyticsDto {
  @Field()
  id!: string;

  @Field()
  text!: string;

  @Field()
  type!: string;

  @Field(() => [AnswerFrequencyDto])
  answerFrequency!: AnswerFrequencyDto[];
}

@ObjectType()
export class AnswerFrequencyDto {
  @Field()
  text!: string;

  @Field(() => Int)
  count!: number;

  @Field(() => Float)
  percentage!: number;
}
