// role.enum.ts
import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

registerEnumType(Role, {
  name: 'Role', // This is the name of the enum in the GraphQL schema
  description: 'The roles of the user', // Optional description
});
