import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarPath: string;

  @Column({ type: 'varchar', default: '' })
  position: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @CreateDateColumn()
  createDate: Date; // Автоматически заполняется текущей датой при создании записи

  @Column({ nullable: true })
  deleteDate: Date; // Остаётся пустым, пока не будет заполнено вручную

  @Column({ default: false })
  isDeleted: boolean;

  // Связь с комментариями
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
