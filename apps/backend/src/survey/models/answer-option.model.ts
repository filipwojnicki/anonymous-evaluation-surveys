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
import { Question } from '.';

@Table({
  timestamps: true,
  charset: 'utf8mb4',
})
export class AnswerOption extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  override id!: string;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  questionId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text!: string;

  @CreatedAt
  public override createdAt!: Date;
  @UpdatedAt
  public override updatedAt!: Date;

  @BelongsTo(() => Question)
  question!: Question;
}
