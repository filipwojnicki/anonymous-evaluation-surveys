import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnswerOptionDto {
  @Field()
  id!: string;

  @Field()
  questionId!: string;

  @Field()
  text!: string;
}
