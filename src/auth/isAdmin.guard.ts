import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthGuard } from './auth.guard';

@Injectable()
export class IsAdminGuard extends JwtAuthGuard implements CanActivate {
  // Override the `canActivate` method to check for admin rights
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);
    } catch (err) {
      throw err;
    }

    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    // For GraphQL requests, you should use context to get the headers
    const request = gqlContext.req;

    // Check if the user is an admin
    if (request.isAdmin == true) {
      return true; // If the user is an admin, allow access
    } else {
      throw new ForbiddenException(
        'Only Admins are allowed to access this endpoint',
      );
    }
  }
}
