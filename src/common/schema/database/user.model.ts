import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { EmployeeData } from './employeeData.model';
import { Role } from '../../../common/enums/userRole';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role })
  role: Role;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmployeeData',
    required: false,
    default: null,
  })
  data?: EmployeeData;
}

export const UserSchema = SchemaFactory.createForClass(User);
