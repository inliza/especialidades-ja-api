import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { Zone } from '../entities/zone.entity';
import { Rank } from '../entities/rank.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto, UpdateUserStatusDto } from '../dtos/update-user.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.userId, updateUserDto);
  }

  @Put('update-status')
  @UseGuards(AuthGuard('jwt'))
  async updateUserStatus(@Req() req, @Body() updateUserDto: UpdateUserStatusDto) {
    if (!req.user.isAdmin) {
      throw new ForbiddenException({ message: 'Usted no tiene permiso para realizar esta accion. Gracias :3' });
    }
    return this.usersService.updateUserStatus(updateUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto.email, loginDto.password);
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // Ruta protegida
  getProfile(@Req() req) {
    return this.usersService.getUser(req.user.userId);
  }

  @Get('profile/:id')
  @UseGuards(AuthGuard('jwt')) // Ruta protegida
  getProfileById(@Param('id') id: number) {
    return this.usersService.getUserWithSpecialties(id);
  }


  @Get('get-all')
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() req) {
    return this.usersService.getUsers();
  }
}
