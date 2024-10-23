import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Origin = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.get('origin') || request.get('host');
  },
);
