import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    // For GraphQL requests, you should use context to get the headers
    const request = gqlContext.req;

    if (!request || !request.headers['authorization']) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = request.headers['authorization']
      .replace('Bearer ', '')
      .trim();
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = await this.authService.validateJwtToken(token);
      request.isAdmin = decoded.isAdmin;
      request.user = decoded;
      return true; // If token is valid, allow the request
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
