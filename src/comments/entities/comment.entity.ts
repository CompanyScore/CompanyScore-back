import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Импортируем сущность User
import { Company } from 'src/companies/entities/company.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @Column()
  position: string;

  @CreateDateColumn()
  createDate: Date; // Автоматически заполняется текущей датой при создании записи

  @Column({ default: false })
  isDeleted: boolean;

  // Связь с пользователем
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Company, (company) => company.comments)
  company: Company;
}
