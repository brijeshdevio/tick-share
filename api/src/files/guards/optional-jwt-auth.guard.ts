import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { COOKIE_NAME } from '../../constants';

@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.[COOKIE_NAME.ACCESS_TOKEN] as string;

    try {
      if (!token) return true;
      const payload = (await this.jwtService.verifyAsync(token)) as unknown;
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token.');
    }
    return true;
  }
}
