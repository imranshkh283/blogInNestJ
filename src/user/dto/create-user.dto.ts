export class CreateUserDto {
  email: string;
  firstname: string;
  lastname: string;
}

export class CreateProfileDto {
  bio: string;
  userId: number;
}
