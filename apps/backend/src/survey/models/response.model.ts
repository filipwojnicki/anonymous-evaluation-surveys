import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AnswerOption, Question, Survey } from '.';

@Table({
  timestamps: true,
  charset: 'utf8mb4',
})
export class Response extends Model {
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

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  questionId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  answerText!: string;

  @ForeignKey(() => AnswerOption)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  answerOptionId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  anonymousId!: string;

  @CreatedAt
  public override createdAt!: Date;
  @UpdatedAt
  public override updatedAt!: Date;

  @BelongsTo(() => Survey)
  survey!: Survey;

  @BelongsTo(() => Question)
  question!: Question;

  @BelongsTo(() => AnswerOption)
  answerOption!: AnswerOption;
}
