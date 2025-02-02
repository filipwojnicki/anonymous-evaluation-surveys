import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class SurveyAnalyticsDto {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field()
  responses!: number;

  @Field(() => Float)
  completionRate!: number;
}
