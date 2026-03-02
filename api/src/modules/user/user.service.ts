import { UnauthorizedException } from "@/common/errors";
import { prisma } from "@/config";

export class UserService {
  private readonly prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  findById = async (id: string) => {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (user) return user;

    throw new UnauthorizedException();
  };
}
