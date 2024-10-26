export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  status?: user_status;
  role?: UserRole;
  password?: string;
};

export enum user_status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserProfile {
  id: number;
  bio: string;
  userId: number;
}
