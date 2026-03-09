import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { env, prisma } from "../../config";
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "../../common";
import { DUMMY_HASH, PRISMA_ERROR_CODES } from "../../constants";
import { comparePassword, hashPassword } from "../../lib";
import { LoginDto, RegisterDto } from "./auth.types";

export class AuthService {
  constructor() {}

  private accessToken = (payload: Record<string, unknown>): string => {
    return jwt.sign(payload, env.JWT_SECRET!, {
      expiresIn: "3d",
    });
  };

  register = async (data: RegisterDto) => {
    try {
      const hashedPassword = await hashPassword(data.password);
      return await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });
    } catch (error) {
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

  login = async (data: LoginDto) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
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

  getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (user) return user;

    throw new UnauthorizedException();
  };
}
