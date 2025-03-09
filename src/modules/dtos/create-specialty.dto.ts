import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSpecialtyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;


  @IsInt()
  @IsNotEmpty()
  id_category: number;
}



export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  }
  