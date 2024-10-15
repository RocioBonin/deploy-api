import { CanActivate, ExecutionContext, HttpException, Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if(!token) {
      
      throw new HttpException('Token no encontrado', 401)
    }

    try {
      
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET')
      });
      request['user'] = payload;

    } catch (error) {
      
      throw new HttpException('Token invalido', 401)

    } 

    return true;
  }

  private extractToken(request: Request) {
    const [ type, token ] = request.headers.authorization?.split(' ') ?? [];

    return type == 'Bearer' ? token : undefined;
  }
}
