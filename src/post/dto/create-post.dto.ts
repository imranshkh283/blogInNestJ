import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  // @IsNotEmpty({ message: 'Author email is required' })
  // @IsString()
  // @IsEmail()
  // @MinLength(3)
  // email: string;

  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  @MinLength(10)
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  @IsString({ message: 'Content must be a string' })
  content: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
