import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ unique: true, name: 'name' })
  name: string;

  @Column({ name: 'asociacion' })
  asociacion: string;

  @OneToMany(() => User, (user) => user.zone)
  users: User[];
}
