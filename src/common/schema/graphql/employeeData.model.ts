import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'employee data' })
export class EmployeeDataResolverModel {
  @Field()
  age: number;

  @Field()
  class: string;

  @Field(() => [String])
  subjects: string[];

  @Field(() => [String])
  attendances: string[];
}
