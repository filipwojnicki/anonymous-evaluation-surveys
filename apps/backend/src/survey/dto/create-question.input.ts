import { InputType, Field } from '@nestjs/graphql';
import {
  IsUUID,
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from '../types/question-type.enum';
import { AnswerOptionInput } from './answer-option.input';

@InputType()
export class CreateQuestionInput {
  @IsUUID()
  @Field()
  surveyId!: string;

  @IsString()
  @Field()
  text!: string;

  @IsEnum(QuestionType)
  @Field(() => QuestionType)
  type!: QuestionType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [AnswerOptionInput], { nullable: true })
  answerOptions?: AnswerOptionInput[];
}
