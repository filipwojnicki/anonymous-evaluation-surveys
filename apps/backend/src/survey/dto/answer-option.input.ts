import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class AnswerOptionInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  text!: string;
}
