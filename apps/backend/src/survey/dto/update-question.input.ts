import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { AnswerOptionInput } from './answer-option.input';
import { QuestionType } from '../types/question-type.enum';

@InputType()
export class UpdateQuestionInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  text?: string;

  @IsEnum(QuestionType)
  @IsOptional()
  @Field(() => QuestionType, { nullable: true })
  type?: QuestionType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [AnswerOptionInput], { nullable: true })
  answerOptions?: AnswerOptionInput[];
}
