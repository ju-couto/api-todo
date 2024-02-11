import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  done: boolean;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
