import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { AnswerOption, Survey } from '.';
import { QuestionType } from '../types/question-type.enum';
import { registerEnumType } from '@nestjs/graphql';

@Table({
  timestamps: true,
  charset: 'utf8mb4',
})
export class Question extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  override id!: string;

  @ForeignKey(() => Survey)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  surveyId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text!: string;

  @Column({
    type: DataType.ENUM(...Object.values(QuestionType)),
    allowNull: false,
  })
  type!: QuestionType;

  @CreatedAt
  public override createdAt!: Date;
  @UpdatedAt
  public override updatedAt!: Date;

  @BelongsTo(() => Survey)
  survey!: Survey;

  @HasMany(() => AnswerOption)
  answerOptions!: AnswerOption[];
}

registerEnumType(QuestionType, {
  name: 'QuestionType',
  description: 'The type of question',
});
