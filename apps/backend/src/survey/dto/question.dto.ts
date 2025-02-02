import { Field, ObjectType } from '@nestjs/graphql';
import { AnswerOptionDto } from './answer-option.dto';

@ObjectType()
export class QuestionDto {
  @Field()
  id!: string;

  @Field()
  surveyId!: string;

  @Field()
  text!: string;

  @Field()
  type!: string;

  @Field(() => [AnswerOptionDto], { nullable: true })
  answerOptions?: AnswerOptionDto[];
}
