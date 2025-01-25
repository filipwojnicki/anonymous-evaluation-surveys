import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Survey } from '../../survey/models/survey.model';

@Table({
  timestamps: true,
  charset: 'utf8mb4',
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  override id!: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    allowNull: false,
  })
  password!: string;

  @CreatedAt
  public override createdAt!: Date;
  @UpdatedAt
  public override updatedAt!: Date;

  @HasMany(() => Survey)
  surveys!: Survey[];
}
