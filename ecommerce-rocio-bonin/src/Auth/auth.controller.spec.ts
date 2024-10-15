import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: Partial<AuthService>;

  const mockAuthResponse = {
    token: 'fake-jwt-token',
  };

  const mockCredentials: SignInAuthDto = {
    email: 'user@example.com',
    password: 'Password@123',
  };

  beforeEach(async () => {

    mockAuthService = {
      signIn: (credentials: SignInAuthDto) => Promise.resolve(mockAuthResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('signIn() debería retornar un token JWT', async () => {
    const result = await authController.signIn(mockCredentials);

    expect(result).toEqual(mockAuthResponse);
  });
});
