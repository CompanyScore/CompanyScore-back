import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Comment } from '../../comments/entities/comment.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: Role.USER })
  role: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  linkedinId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: false })
  email: string;

  @Column({ default: 'Моя должность' })
  position: string;

  @Column({
    default:
      'Мое краткое описание. Например, я работаю в компании XYZ и занимаюсь разработкой ПО.',
  })
  description: string;

  @CreateDateColumn()
  createDate: Date; // Автоматически заполняется текущей датой при создании записи

  @Column({ nullable: true })
  deleteDate: Date; // Остаётся пустым, пока не будет заполнено вручную

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  country?: string;

  // Связь с комментариями
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
