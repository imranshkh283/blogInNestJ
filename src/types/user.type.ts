export interface UserType {
  id: number;
  name: string;
  email: string;
  fullname: string;
  firstname: string;
  lastname: string;
  password: string;
  status: UserStatus;
  role: UserRole;
}

enum UserStatus {
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
