import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Firstname is required' })
  @MinLength(3, { message: 'Firstname must be at least 3 characters' })
  @IsString()
  firstname: string;

  @IsNotEmpty({ message: 'Lastname is required' })
  @MinLength(3, { message: 'Lastname must be at least 3 characters' })
  @IsString()
  lastname: string;
}

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Bio is required' })
  @Min(3, { message: 'Bio must be at least 3 characters' })
  @IsString()
  bio: string;

  @IsNotEmpty({ message: 'UserId is required' })
  @IsNumber({}, { message: 'UserId must be a number' })
  userId: number;
}
