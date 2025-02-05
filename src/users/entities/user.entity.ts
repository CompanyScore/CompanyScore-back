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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: Role.USER })
  role: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  linkedinId: string;

  @Column({ default: 'BugSlayer9000' })
  name: string;

  @Column({ nullable: true, default: '/files/users/avatars/default-ava.jpg' })
  avatar: string;

  @Column({ default: 'fullstack' })
  position: string;

  @Column({
    default:
      'Работаю в IT уже 10 лет, но до сих пор не понимаю, как одна строчка кода может сломать весь прод. Люблю писать код, который потом сам же и переписываю. Считаю, что комментарии в коде — это для слабаков, ведь настоящий разработчик должен страдать. Обожаю митинги, особенно те, на которых мог бы просто получить письмо.',
  })
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
