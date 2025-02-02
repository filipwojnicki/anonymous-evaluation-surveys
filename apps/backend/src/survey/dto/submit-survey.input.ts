import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsArray } from 'class-validator';

@InputType()
export class AnswerInput {
  @Field()
  @IsString()
  questionId!: string;

  @Field()
  @IsString()
  answer!: string;
}

@InputType()
export class SubmitSurveyResponseInput {
  @Field()
  @IsString()
  token!: string;

  @Field(() => [AnswerInput])
  @IsArray()
  answers!: AnswerInput[];
}
