import { Role } from 'src/auth/interfaces';

export interface User {
  email: string;
  name: string;
  lastName: string;
  password: string;
  isActive: boolean;
  role: Role;
  createdAt: number;
}
