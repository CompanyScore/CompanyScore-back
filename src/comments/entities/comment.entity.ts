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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: string;

  @Column()
  gradeYear: number;

  @Column()
  gradeMonth: number;

  @Column()
  taskText: string;

  @Column()
  taskRating: number;

  @Column()
  interviewText: string;

  @Column()
  interviewRating: number;

  @Column()
  workRatingTeam: number;

  @Column()
  workRatingManagement: number;

  @Column()
  workRatingStack: number;

  @Column()
  workRatingProject: number;

  @Column()
  workRatingWorkFormat: number;

  @Column()
  workRatingFinanceSalary: number;

  @Column()
  workRatingFinanceMedicine: number;

  @Column()
  workRatingFinancePremium: number;

  @Column()
  workRatingFinanceBonuses: number;

  @Column()
  workRatingFinanceStocks: number;

  @Column()
  workRatingFinanceDividends: number;

  @Column()
  workRatingOtherEducation: number;

  @Column()
  workRatingOtherEvents: number;

  @Column()
  recommendationIsRecommended: boolean;

  @Column()
  recommendationReasonJoined: string;

  @Column()
  recommendationReasonLeft: string;

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
