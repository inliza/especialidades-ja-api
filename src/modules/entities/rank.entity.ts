import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('ranks')
export class Rank {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({ unique: true, name: 'name' })
  name: string;

  @OneToMany(() => User, (user) => user.rank)
  users: User[];
}
