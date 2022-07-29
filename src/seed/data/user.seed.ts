import { Role } from 'src/auth/interfaces';
import { User } from '../interfaces';

export const USERS_SEED: User[] = [
  {
    name: 'Agustin',
    lastName: 'Leguizamon',
    email: 'agustin@leg.com',
    isActive: true,
    createdAt: new Date().getTime(),
    password: '123456',
    role: Role.admin,
  },
  {
    name: 'Pedro',
    lastName: 'capo',
    email: 'pedro@capo.com',
    isActive: true,
    createdAt: new Date().getTime(),
    password: '123456',
    role: Role.user,
  },
  {
    name: 'Juan',
    lastName: 'Ruiz',
    email: 'juan@ruiz.com',
    isActive: true,
    createdAt: new Date().getTime(),
    password: '123456',
    role: Role.user,
  },
];
