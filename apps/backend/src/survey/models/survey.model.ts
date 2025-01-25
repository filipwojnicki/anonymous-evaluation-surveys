import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Question } from '.';
import { User } from '../../user/models';

@Table({
  timestamps: true,
  charset: 'utf8mb4',
})
export class Survey extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  override id!: string;

  @Column({
    allowNull: false,
  })
  title!: string;

  @Column({
    allowNull: true,
  })
  description!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  creatorId!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isAnonymous!: boolean;

  @CreatedAt
  public override createdAt!: Date;
  @UpdatedAt
  public override updatedAt!: Date;

  @HasMany(() => Question)
  questions!: Question[];
}
