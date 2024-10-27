import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { user } from '@prisma/client';

export type CurrentUserToken = {
  token: string;
} & CurrentUser;

export type CurrentUser = Pick<user, 'id' | 'email'>;

export const USER_SELECT_FIELDS = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
};

export const getCurrentUser = createParamDecorator(
  (data: keyof CurrentUserToken, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user as CurrentUserToken;

    return data ? user['email'] : user;
  },
);
