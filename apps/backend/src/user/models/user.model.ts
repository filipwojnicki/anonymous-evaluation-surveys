import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { registerEnumType } from '@nestjs/graphql';
import { Survey } from '../../survey/models/survey.model';
import { Role } from '../types';

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
    type: DataType.STRING,
    unique: true,
  })
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(60),
  })
  passwordHash!: string;

  @Column({
    defaultValue: 'author',
    allowNull: false,
    type: DataType.ENUM(...Object.values(Role)),
  })
  role!: string;

  @CreatedAt
  public override createdAt!: Date;
  @UpdatedAt
  public override updatedAt!: Date;

  @HasMany(() => Survey)
  surveys!: Survey[];
}

registerEnumType(Role, {
  name: 'Role',
});
