import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Category, (category) => category.specialties)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @Column({ name: 'id_category', type: 'int' })
  id_category: number;
}
