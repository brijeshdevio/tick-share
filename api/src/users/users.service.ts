import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MESSAGES } from '../constants';
import type { FindByIdResponse } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<FindByIdResponse> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      omit: { passwordHash: true },
    });
    if (user) return user;

    throw new UnauthorizedException(MESSAGES.UNAUTHORIZED);
  }
}
