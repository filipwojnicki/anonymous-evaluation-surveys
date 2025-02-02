import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/services';
import { Role } from '../user/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService
  ) {}

  async register(email: string, password: string) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await this.usersService.createUser(
        email,
        passwordHash,
        Role.Author
      );

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return this.jwtService.sign({ userId: user.id, role: user.role });
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return this.jwtService.sign({ userId: user.id, role: user.role });
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  generateAnonymousToken(surveyId: string, tokenId: string) {
    try {
      this.logger.debug(`Generating anonymous token for survey ${surveyId}`);
      return this.jwtService.sign({ surveyId, tokenId });
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
