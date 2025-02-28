import { IsInt, IsNotEmpty } from 'class-validator';

export class UpsertUserSpecialtyDto {
  @IsInt()
  @IsNotEmpty()
  specialtyId: number;
}
