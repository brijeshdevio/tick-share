import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { LoginDto, RegisterDto } from "./auth.types";
import { prisma } from "../../config";
import { comparePassword, hashPassword } from "../../lib";
import { DUMMY_HASH, PRISMA_ERROR_CODES } from "../../constants";
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "../../common/errors";

export class AuthService {
  private readonly prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  private accessToken(payload: Record<string, unknown>): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });
  }

  register = async (data: RegisterDto): Promise<void> => {
    try {
      const hashedPassword = await hashPassword(data.password);
      await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: hashedPassword,
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
  };

  login = async (data: LoginDto): Promise<string> => {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    const passwordToCheck = user?.passwordHash ?? DUMMY_HASH;
    const isPasswordValid = await comparePassword(
      passwordToCheck,
      data.password,
    );

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    return this.accessToken({
      sub: user.id,
      type: "access",
    });
  };
}
