import { IsString, IsNotEmpty, IsEmail, IsOptional, IsInt, MinLength, MaxLength, IsDateString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @IsDateString()
    @IsNotEmpty()
    birthDate: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    church: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    alias: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(15)
    phone: string;

    @IsInt()
    @IsNotEmpty()
    zoneId: number;

    @IsInt()
    @IsNotEmpty()
    rankId: number;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

}

export class UpdateUserStatusDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsBoolean()
    @IsNotEmpty()
    active: boolean;

}
