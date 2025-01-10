import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Импортируем сущность User

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createDate: Date; // Автоматически заполняется текущей датой при создании записи

  @Column({ default: false })
  isDeleted: boolean;

  // Связь с пользователем
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
