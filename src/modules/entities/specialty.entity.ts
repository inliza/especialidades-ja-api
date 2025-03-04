import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

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

  @ManyToMany(() => User, (user) => user.specialties)
  users: User[];
}
