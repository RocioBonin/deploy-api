import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {

  let jwtService: JwtService;
  let authGuard: AuthGuard;
  let configService: ConfigService;

  beforeEach(() => {
    jwtService = new JwtService(null);
    configService = new ConfigService(); 
    authGuard = new AuthGuard(jwtService, configService);
  })

  it('Esta definido', () => {
    expect(authGuard).toBeDefined();
  });
});
