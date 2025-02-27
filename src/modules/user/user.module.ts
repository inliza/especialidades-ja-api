import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from '../entities/user.entity';
import { Zone } from '../entities/zone.entity';
import { Rank } from '../entities/rank.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Zone, Rank]), AuthModule], // Se registran las entidades para TypeORM
  controllers: [UsersController], // Se define el controlador
  providers: [UsersService], // Se define el servicio
  exports: [UsersService], // Se exporta para su uso en otros módulos si es necesario
})
export class UsersModule {}
