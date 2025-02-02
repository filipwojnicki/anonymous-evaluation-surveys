import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Response } from './response.model';
import { Question } from './question.model';

@Table({
  timestamps: true,
})
export class Answer extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  override id!: string;

  @ForeignKey(() => Response)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  responseId!: string;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  questionId!: string;

  @Column
  answer!: string;

  @BelongsTo(() => Response)
  response!: Response;

  @BelongsTo(() => Question)
  question!: Question;
}
