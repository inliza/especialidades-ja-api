import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Specialty } from './specialty.entity';

@Entity('categories')
export class Category {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({ unique: true, name: 'name', type: 'varchar' })
  name: string;

  @Column({ default: true, name: 'active', type: 'boolean' })
  active: boolean;

  @OneToMany(() => Specialty, (specialty) => specialty.category)
  specialties: Specialty[];
  
}
