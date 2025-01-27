import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse, LoginInput, RegisterInput } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerInput: RegisterInput) {
    const token = await this.authService.register(
      registerInput.email,
      registerInput.password
    );

    return {
      success: true,
      message: 'User registered successfully',
      accessToken: token,
    };
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginInput: LoginInput) {
    const token = await this.authService.login(
      loginInput.email,
      loginInput.password
    );
    return { success: true, message: 'Login successful', accessToken: token };
  }
}
