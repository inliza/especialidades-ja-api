import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../entities/specialty.entity';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, CreateSpecialtyDto } from '../dtos/create-specialty.dto';
import { UserSpecialty } from '../entities/user-specialties.entity';
import { UpsertUserSpecialtyDto } from '../dtos/upsert-user-specialty.dto';

@Injectable()
export class SpecialtyService {
    constructor(
        @InjectRepository(Specialty)
        private specialtyRepository: Repository<Specialty>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(UserSpecialty)
        private userSpecialtyRepository: Repository<UserSpecialty>
    ) { }

    async createCategory(dto: CreateCategoryDto): Promise<Category> {
        const entity = new Category();
        entity.name = dto.name;
        entity.active = true;
        return this.categoryRepository.save(entity);
    }


    // Crear una especialidad
    async createSpecialty(specialtyDto: CreateSpecialtyDto): Promise<Specialty> {
        const category = await this.categoryRepository.findOne({ where: { id: specialtyDto.id_category } });
        if (!category) {
            throw new Error('Category not found');
        }

        const specialty = this.specialtyRepository.create({
            name: specialtyDto.name,
            active: true,
            category: category,
            id_category: specialtyDto.id_category,
            url: specialtyDto.url,
        });

        return this.specialtyRepository.save(specialty);
    }

    // Obtener todas las especialidades
    async getAllSpecialties(): Promise<Specialty[]> {
        return this.specialtyRepository.find({ relations: ['category'] });
    }

    // Obtener una especialidad por ID
    async getSpecialtyById(id: number): Promise<Specialty> {
        return this.specialtyRepository.findOne({ where: { id } });
    }

    async getActiveCategories(): Promise<any[]> {
        try {
            const categories = await this.categoryRepository.find({ where: { active: true }, relations: ['specialties'] });
            return categories;
        } catch (error) {
            console.error('Error fetching active categories:', error);
            throw error;
        }
    }

    async getUserSpecialty(id: number): Promise<UserSpecialty[]> {
        return this.userSpecialtyRepository.find({ where: { userId: id } });
    }

    async upsertUserSpecialty(userId: number, userSpecialtiesDto: UpsertUserSpecialtyDto[]): Promise<any> {
        try {
            await this.userSpecialtyRepository.delete({ userId });

            const entities = userSpecialtiesDto.map(item => {
                return { ...item, userId: userId };
            });

            if (entities.length > 0) {
                const userSpecialties = this.userSpecialtyRepository.create(userSpecialtiesDto);
                await this.userSpecialtyRepository.save(entities);
            }
            return { message: 'User specialties updated' };
        } catch (error) {
            console.error('Error on upsertUserSpecialty:', error);
            throw error;
        }

    }

}
