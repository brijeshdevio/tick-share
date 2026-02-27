import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import type { Response } from 'express';
import { ZodValidationPipe } from '../common/pipes';
import { JwtAuthGuard } from '../common/guards';
import { apiResponse, setCookie } from '../lib';
import { COOKIE_EXPIRES, COOKIE_NAME, MESSAGES } from '../constants';
import { AuthService } from './auth.service';
import { LoginSchema, RegisterSchema } from './schema';
import type { LoginDto, RegisterDto } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return apiResponse(201, { message: MESSAGES.USER_CREATION_SUCCESS });
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDto, @Res() res: Response): Promise<Response> {
    const accessToken = await this.authService.login(body);
    setCookie(COOKIE_NAME.ACCESS_TOKEN, accessToken, res, {
      maxAge: COOKIE_EXPIRES.ACCESS_TOKEN,
    });
    return res.status(200).json({ message: MESSAGES.USER_LOGIN_SUCCESS });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie(COOKIE_NAME.ACCESS_TOKEN);
    return res.status(200).json({ message: MESSAGES.USER_LOGOUT_SUCCESS });
  }
}
