import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class PaginationDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortBy?: string = 'name'; // Default sorting by createdAt

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc' = 'asc'; // Default sorting order is ascending
}
