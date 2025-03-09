import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Zone } from './zone.entity';
import { Rank } from './rank.entity';
import { Specialty } from './specialty.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: string;

  @Column({ name: 'church' })
  church: string;

  @Column({ unique: true, name: 'email' })
  email: string;

  @Column({ name: 'alias' })
  alias: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ type: 'int', name: 'zone_id', nullable: true })
  zoneId: number;

  @Column({ type: 'int', name: 'rank_id', nullable: true  })
  rankId: number;

  @ManyToOne(() => Zone, (zone) => zone.users)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @ManyToOne(() => Rank, (rank) => rank.users)
  @JoinColumn({ name: 'rank_id' })
  rank: Rank;


  @ManyToMany(() => Specialty, (specialty) => specialty.users)
  @JoinTable({
    name: 'user_specialties', // Nombre de la tabla intermedia
    joinColumn: { name: 'user_id', referencedColumnName: 'id' }, // Relación con la entidad 'users'
    inverseJoinColumn: { name: 'specialty_id', referencedColumnName: 'id' } // Relación con la entidad 'specialties'
  })
  specialties: Specialty[];

  @Column({ type: 'boolean', default: false, name: 'isadmin' })
  isAdmin: boolean;

  @Column({ type: 'boolean', default: true, name: 'isactive' })
  isActive: boolean;

}
