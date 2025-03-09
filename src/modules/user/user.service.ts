import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Zone } from '../entities/zone.entity';
import { Rank } from '../entities/rank.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, UpdateUserStatusDto } from '../dtos/update-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Zone) private zoneRepository: Repository<Zone>,
    @InjectRepository(Rank) private rankRepository: Repository<Rank>,
    private authService: AuthService
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, zoneId, rankId } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    const zone = await this.zoneRepository.findOne({ where: { id: zoneId } });
    if (!zone) {
      throw new NotFoundException('Zona no encontrada');
    }

    const rank = await this.rankRepository.findOne({ where: { id: rankId } });
    if (!rank) {
      throw new NotFoundException('Rango no encontrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const entity = Object.assign(new User(), { ...createUserDto, password: hashedPassword, zone, rank });
    await this.userRepository.save(entity);
    return { message: `Usuario ${entity.email} creado con éxito` };

  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'firstName', 'lastName', 'birthDate', 'church', 'email', 'alias', 'phone', 'zone', 'rank', 'isAdmin'],
      relations: ['zone', 'rank'],
    });
  }

  async getUserWithSpecialties(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'firstName', 'lastName', 'birthDate', 'church', 'alias', 'phone', 'zone', 'rank'],
      relations: ['zone', 'rank', 'specialties', 'specialties.category'],
    });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'birthDate', 'church', 'email', 'alias', 'phone', 'zone', 'rank', 'isActive'],
      relations: ['zone', 'rank', 'specialties'],
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (updateUserDto.zoneId) {
      const zone = await this.zoneRepository.findOne({ where: { id: updateUserDto.zoneId } });
      if (!zone) throw new NotFoundException('Zona no encontrada');
      user.zoneId = zone.id;
    }

    if (updateUserDto.rankId) {
      const rank = await this.rankRepository.findOne({ where: { id: updateUserDto.rankId } });
      if (!rank) throw new NotFoundException('Rango no encontrado');
      user.rankId = rank.id;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return { message: `Usuario ${user.email} actualizado con éxito` };

  }

  async updateUserStatus(payload: UpdateUserStatusDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: payload.userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.isActive = payload.active;
    await this.userRepository.save(user);

    return { message: `Usuario ${user.email} actualizado con éxito status: ${payload.active}` };

  }


  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Credenciales inválidas');
    }else if(!user.isActive){
      throw new BadRequestException('Su usuario se encuentra deshabilitado');
    }

    const payload = { email: user.email, sub: user.id, isAdmin: user.isAdmin };
    return { accessToken: await this.authService.generateToken(payload) };
  }

  private async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }





  // Métodos para Zone
  async getAllZones(): Promise<Zone[]> {
    return this.zoneRepository.find();
  }

  async getAllRanks(): Promise<Rank[]> {
    return this.rankRepository.find();
  }


  async getZoneById(id: number): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({ where: { id } });
    if (!zone) {
      throw new NotFoundException(`Zone with ID ${id} not found`);
    }
    return zone;
  }


  async getRankById(id: number): Promise<Rank> {
    const rank = await this.rankRepository.findOne({ where: { id } });
    if (!rank) {
      throw new NotFoundException(`Rank with ID ${id} not found`);
    }
    return rank;
  }
}
