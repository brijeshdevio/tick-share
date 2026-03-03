import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type CurrentUserType = {
  sub: string;
  type: string;
};

type CurrentUserKey = keyof CurrentUserType;

export const CurrentUser = createParamDecorator(
  (data: CurrentUserKey | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'] as CurrentUserType;

    if (data) return user?.[data];
    return user;
  },
);
