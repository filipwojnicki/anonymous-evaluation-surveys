import { Injectable, ExecutionContext, ContextType } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CombinedThrottlerGuard extends ThrottlerGuard {
  override getRequestResponse(context: ExecutionContext) {
    const reqType = context.getType<ContextType | 'graphql'>();
    if (reqType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();
      return { req: ctx.req, res: ctx.res };
    } else if (reqType === 'http') {
      return {
        req: context.switchToHttp().getRequest(),
        res: context.switchToHttp().getResponse(),
      };
    }

    return { req: {}, res: {} };
  }
}
