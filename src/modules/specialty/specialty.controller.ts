import { Controller, Get, Post, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateCategoryDto, CreateSpecialtyDto } from '../dtos/create-specialty.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpsertUserSpecialtyDto } from '../dtos/upsert-user-specialty.dto';

@Controller('api/specialties')
export class SpecialtyController {
    constructor(private readonly specialtyService: SpecialtyService) { }

    // Crear una nueva especialidad
    @UseGuards(AuthGuard('jwt')) // Ruta protegida
    @Post('create')
    async create(@Req() req, @Body() specialtyDto: CreateSpecialtyDto) {
        if (!req.user.isAdmin) {
            throw new ForbiddenException({ message: 'Usted no tiene permiso para realizar esta accion. Gracias :3' });
        }

        return this.specialtyService.createSpecialty(specialtyDto);
    }

    @UseGuards(AuthGuard('jwt')) // Ruta protegida
    @Post('categories/create')
    async createCategory(@Req() req, @Body() category: CreateCategoryDto) {
        if (!req.user.isAdmin) {
            throw new ForbiddenException({ message: 'Usted no tiene permiso para realizar esta accion. Gracias :3' });
        }

        return this.specialtyService.createCategory(category);
    }


    // Obtener todas las especialidades
    @UseGuards(AuthGuard('jwt')) // Ruta protegida
    @Get('get')
    async findAll() {
        return this.specialtyService.getAllSpecialties();
    }

    // Obtener una especialidad por ID
    @UseGuards(AuthGuard('jwt')) // Ruta protegida
    @Get('get/:id')
    async findOne(@Param('id') id: number) {
        return this.specialtyService.getSpecialtyById(id);
    }

    // Obtener categorías activas
    @UseGuards(AuthGuard('jwt')) // Ruta protegida
    @Get('categories')
    async findActiveCategories() {
        return this.specialtyService.getActiveCategories();
    }


    // Obtener categorías activas
    @UseGuards(AuthGuard('jwt')) // Ruta protegida
    @Get('user-specialties')
    async getUserSpecialties(@Req() req,) {
        return this.specialtyService.getUserSpecialty(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt')) // Ruta protegida
    @Post('user-specialties/upsert')
    async bulkInsert(@Req() req, @Body() userSpecialtiesDto: UpsertUserSpecialtyDto[]) {
        return this.specialtyService.upsertUserSpecialty(req.user.userId, userSpecialtiesDto);
    }
}
