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
import { Survey } from '.';

@Table({
  timestamps: true,
  charset: 'utf8mb4',
})
export class Token extends Model {
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
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  token!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isUsed!: boolean;

  @CreatedAt public override createdAt!: Date;
  @UpdatedAt public override updatedAt!: Date;

  @BelongsTo(() => Survey)
  survey!: Survey;
}
