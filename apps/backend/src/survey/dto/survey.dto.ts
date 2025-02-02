import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionDto } from './question.dto';

@ObjectType()
export class SurveyDto {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creatorId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [QuestionDto], { nullable: true })
  questions?: QuestionDto[];
}
