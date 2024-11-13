import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDataDocument = HydratedDocument<EmployeeData>;

@Schema()
export class EmployeeData {
  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true, default: [] })
  subjects: string[];

  @Prop({ required: true, default: [] })
  attendances: string[];
}

export const EmployeeDataSchema = SchemaFactory.createForClass(EmployeeData);
