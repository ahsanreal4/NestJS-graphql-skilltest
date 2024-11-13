import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserResolverModel } from 'src/common/schema/graphql/user.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserResolverModel)
  async getProfile(@Context() context) {
    const user = context.req.user;

    return await this.authService.getProfile(user?.email);
  }
}
