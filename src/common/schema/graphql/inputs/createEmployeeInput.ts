// create-employee.input.ts
import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  @MinLength(8)
  @MaxLength(100)
  email: string;

  @Field()
  @IsInt()
  @Min(18)
  @Max(65)
  age: number;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  class: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  subjects: string[];

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  attendances: string[];
}
