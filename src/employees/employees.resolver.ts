// sample.resolver.ts
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserResolverModel } from '../common/schema/graphql/user.model';
import { EmployeesService } from './employees.service';
import { CreateEmployeeInput } from '../common/schema/graphql/inputs/createEmployeeInput';
import { UseGuards } from '@nestjs/common';
import { IsAdminGuard } from '../auth/isAdmin.guard';
import { PaginationDto } from '../common/schema/graphql/inputs/paginationInput';
import { GetEmployeesResponse } from '../common/schema/graphql/responses/paginationResponse';

@UseGuards(IsAdminGuard)
@Resolver(() => UserResolverModel)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeesService) {}

  @Query(() => GetEmployeesResponse, { name: 'getEmployees' })
  async getEmployees(@Args('paginationInput') paginationInput: PaginationDto) {
    return await this.employeeService.getEmployees(paginationInput);
  }

  @Query(() => [UserResolverModel], { name: 'getEmployeesByName' })
  async getEmployeesByName(@Args('name') name: string) {
    return await this.employeeService.getEmployeesByName(name);
  }

  @Query(() => [UserResolverModel], { name: 'getEmployeesByClass' })
  async getEmployeesByClass(@Args('className') className: string) {
    return await this.employeeService.getEmployeesByClass(className);
  }

  @Query(() => UserResolverModel, { name: 'getEmployeeById' })
  async getEmployee(@Args('id') id: string) {
    return await this.employeeService.getEmployee(id);
  }

  @Mutation(() => UserResolverModel)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return await this.employeeService.createEmployee(createEmployeeInput);
  }

  @Mutation(() => String)
  async deleteEmployeeById(@Args('id') id: string) {
    return await this.employeeService.deleteEmployeeById(id);
  }
}
