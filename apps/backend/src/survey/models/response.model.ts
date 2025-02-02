import {
  Table,
  Column,
  Model,
  BelongsTo,
  HasMany,
  ForeignKey,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Survey } from './survey.model';
import { Answer } from './answer.model';

@Table({
  timestamps: true,
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  anonymousId!: string;

  @BelongsTo(() => Survey)
  survey!: Survey;

  @HasMany(() => Answer)
  answers!: Answer[];

  @CreatedAt
  public override createdAt!: Date;
  @UpdatedAt
  public override updatedAt!: Date;
}
