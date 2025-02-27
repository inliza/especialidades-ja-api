import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { Zone } from '../entities/zone.entity';
import { Rank } from '../entities/rank.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoints para Zone
  @Get('zones')
  getAllZones(): Promise<Zone[]> {
    return this.usersService.getAllZones();
  }

  @Get('zones/:id')
  getZoneById(@Param('id') id: number): Promise<Zone> {
    return this.usersService.getZoneById(id);
  }

  @Get('ranks')
  getAllRanks(): Promise<Rank[]> {
    return this.usersService.getAllRanks();
  }

  @Get('ranks/:id')
  getRankById(@Param('id') id: number): Promise<Rank> {
    return this.usersService.getRankById(id);
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto.email, loginDto.password);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt')) // Protege la actualización con JWT
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // Ruta protegida
  getProfile(@Req() req) {
    return req.user; // Retorna los datos del usuario autenticado
  }
}
