import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Userctx = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // If a property key is passed (e.g. @User('username')), return just that property
    // Otherwise return the full user object
    return data ? user?.[data] : user;
  },
);