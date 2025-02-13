import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TextAnswerDto {
  @Field()
  text!: string;
}
