import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeResolver } from './employees.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schema/database/user.model';
import {
  EmployeeData,
  EmployeeDataSchema,
} from 'src/common/schema/database/employeeData.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: EmployeeData.name, schema: EmployeeDataSchema },
    ]),
    AuthModule,
  ],
  providers: [EmployeesService, EmployeeResolver],
})
export class EmployeesModule {}
