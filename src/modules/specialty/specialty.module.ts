import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { Specialty } from '../entities/specialty.entity';
import { Category } from '../entities/category.entity';
import { UserSpecialty } from '../entities/user-specialties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty, Category, UserSpecialty])],
  providers: [SpecialtyService],
  controllers: [SpecialtyController],
})
export class SpecialtyModule {}
