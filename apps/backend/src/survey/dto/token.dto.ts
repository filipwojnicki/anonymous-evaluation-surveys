import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenDto {
  @Field()
  id!: string;

  @Field()
  token!: string;

  @Field()
  surveyId!: string;
}
