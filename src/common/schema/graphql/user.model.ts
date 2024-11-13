import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeDataResolverModel } from './employeeData.model';
import { Role } from 'src/common/enums/userRole';

@ObjectType({ description: 'user' })
export class UserResolverModel {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  role: Role;

  @Field(() => EmployeeDataResolverModel, { nullable: true })
  data?: EmployeeDataResolverModel;
}
