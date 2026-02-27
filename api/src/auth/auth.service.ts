import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, hashPassword } from '../lib';
import { DUMMY_HASH, PRISMA_ERROR_CODES } from '../constants';
import type { LoginDto, RegisterDto } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async accessToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync({
      sub: userId,
      type: 'access',
    });
  }

  async register(data: RegisterDto): Promise<void> {
    try {
      const passwordHash = await hashPassword(data.password);
      await this.prismaService.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
        },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.CONFLICT) {
          throw new ConflictException(
            `${data.email} already exists. Please try a different email.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async login(data: LoginDto): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    const passwordToCheck = user?.passwordHash ?? DUMMY_HASH;
    const isPasswordValid = await comparePassword(
      passwordToCheck,
      data.password,
    );

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return await this.accessToken(user.id);
  }
}
