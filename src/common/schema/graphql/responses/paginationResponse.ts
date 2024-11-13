import { Field, ObjectType } from '@nestjs/graphql';
import { UserResolverModel } from '../user.model';

@ObjectType({ description: 'Get Employees Response' })
export class GetEmployeesResponse {
  @Field(() => [UserResolverModel])
  data: UserResolverModel[];

  @Field(() => Number)
  totalCount: number;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;
}
