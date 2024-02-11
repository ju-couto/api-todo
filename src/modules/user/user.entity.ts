import { Task } from 'src/modules/task/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ unique: true})
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({type: 'boolean', default: true})
  active: boolean;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}
