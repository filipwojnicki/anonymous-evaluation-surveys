import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CombinedThrottlerGuard extends ThrottlerGuard {
  override getRequestResponse(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return {
        req: context.switchToHttp().getRequest(),
        res: context.switchToHttp().getResponse(),
      };
    }

    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }
}
