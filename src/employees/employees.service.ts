import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/common/enums/userRole';
import { User } from 'src/common/schema/database/user.model';
import { Model } from 'mongoose';
import { CreateEmployeeInput } from 'src/common/schema/graphql/inputs/createEmployeeInput';
import { EmployeeData } from 'src/common/schema/database/employeeData.model';
import { PaginationDto } from 'src/common/schema/graphql/inputs/paginationInput';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(EmployeeData.name)
    private employeeDataModel: Model<EmployeeData>,
  ) {}

  async createEmployee(
    createEmployeeInput: CreateEmployeeInput,
  ): Promise<User> {
    const findUser = await this.userModel
      .findOne({
        email: createEmployeeInput.email,
      })
      .exec();

    if (findUser)
      throw new BadRequestException(
        'Create Employee failed',
        'user with this email already exists',
      );

    const employeeData: EmployeeData = {
      age: createEmployeeInput.age,
      attendances: createEmployeeInput.attendances,
      class: createEmployeeInput.class,
      subjects: createEmployeeInput.subjects,
    };

    const savedEmployeeData = new this.employeeDataModel(employeeData);
    await savedEmployeeData.save();

    const user: User = {
      name: createEmployeeInput.name,
      email: createEmployeeInput.email,
      password: createEmployeeInput.password,
      role: Role.EMPLOYEE,
      data: savedEmployeeData,
    };

    const savedUser = new this.userModel(user);
    await savedUser.save();

    return savedUser;
  }

  async getEmployees(paginationDto: PaginationDto): Promise<{
    data: User[];
    totalCount: number;
    page: number;
    limit: number;
  }> {
    const { page, limit, sortBy, order } = paginationDto;

    // Calculate skip and limit based on the page and limit
    const skip = (page - 1) * limit;
    const orderOption = order === 'asc' ? 1 : -1;

    // Perform the query with pagination and sorting
    const employees = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: orderOption })
      .exec();

    const totalCount = await this.userModel.countDocuments();

    return {
      data: employees,
      totalCount,
      page,
      limit,
    };
  }

  async getEmployeesByName(name: string): Promise<User[]> {
    return await this.userModel
      .find({ role: Role.EMPLOYEE, name })
      .populate('data')
      .exec();
  }

  async getEmployeesByClass(className: string): Promise<User[]> {
    const employees = await this.userModel
      .find({ role: Role.EMPLOYEE })
      .populate('data')
      .exec();

    return employees.filter((employee) => employee?.data?.class == className);
  }

  async getEmployee(id: string): Promise<User> {
    return await this.userModel
      .findOne({ _id: id, role: Role.EMPLOYEE })
      .populate('data')
      .exec();
  }

  async deleteEmployeeById(id: string) {
    const findUser = await this.userModel
      .findOneAndDelete({ _id: id, role: Role.EMPLOYEE })
      .exec();

    if (!findUser)
      throw new BadRequestException(
        'Delete Employee failed',
        'employee with id ' + id + ' does not exist',
      );

    await this.employeeDataModel.deleteOne({ _id: findUser.data });

    return 'Employee deleted successfully';
  }
}
