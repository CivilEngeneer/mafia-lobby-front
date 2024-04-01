﻿export type UserType = 'master' | 'player' | 'observer';
export type Role = 'mafia' | 'boss' | 'peaceful' | 'commissar' | 'doctor' | 'whore' | 'maniac';

export interface User {
  id: string;
  position?: number;
  name: string;
  type: UserType;
  role?: Role[];
  opened?: boolean;
  online?: boolean;
}

export interface Game {
  users: User[];
  roleSettings: RoleSetting[];
  state: 'new' | 'inProcess';
}

export type RoleSetting = { role: Role, amount: number };
