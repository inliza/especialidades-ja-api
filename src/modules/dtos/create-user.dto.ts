import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsDate, IsInt, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;


  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  secondLastName: string;


  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthDate: Date;

  @IsInt()
  @IsNotEmpty()
  churchId: number;


  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  alias: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10,15}$/, { message: 'Phone must be between 10 and 15 digits' })
  phone: string;

  @IsInt()
  @IsNotEmpty()
  zoneId: number;

  @IsInt()
  @IsNotEmpty()
  rankId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
