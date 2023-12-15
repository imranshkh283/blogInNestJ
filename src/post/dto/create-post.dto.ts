import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsEmpty()
  id?: number;

  @IsNotEmpty({ message: 'Author email is required' })
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(200)
  email: string;

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
