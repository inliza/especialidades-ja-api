import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Zone } from './zone.entity';  // Asegúrate de que la ruta sea correcta
import { User } from './user.entity';

@Entity('churchs')
export class Church {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;


  @Column({ type: 'int', name: 'zone_id', nullable: true })
  zoneId: number;

  @ManyToOne(() => Zone, (zone) => zone.churches, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'zone_id' })
  zone: Zone; // Relación con la tabla 'zones'

  @OneToMany(() => User, (user) => user.church)
  users: User[];
}
