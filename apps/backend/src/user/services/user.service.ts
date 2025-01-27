import {
  BadGatewayException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models';
import { Role } from '../types';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({ where: { email } });
    } catch (e) {
      this.logger.error(e);
      throw new NotFoundException('User not found');
    }
  }

  async createUser(
    email: string,
    passwordHash: string,
    role: Role
  ): Promise<User> {
    try {
      this.logger.debug(`Creating user with email: ${email}`);
      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      return await this.userModel.create({ email, passwordHash, role });
    } catch (e) {
      this.logger.error(e);
      throw new BadGatewayException('Failed to create user');
    }
  }

  async getUserById(id: string) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
