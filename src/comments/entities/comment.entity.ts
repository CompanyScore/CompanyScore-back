import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Unique,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { TaskForm } from 'src/task-form/entities/task-form.entity';
import { InterviewForm } from 'src/interview-form/entities/interview-form.entity';
import { InternshipForm } from 'src/internship-form/entities/internship-form.entity';
import { WorkForm } from 'src/work-form/entities/work-form.entity';

@Entity()
@Unique(['user', 'company']) // ⚠️ ограничение: один пользователь — один отзыв на компанию
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Связь с пользователем
  @ManyToOne(() => User, user => user.comments, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  // Связь с компанией
  @ManyToOne(() => Company, company => company.comments, { eager: true })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: string;

  @Column()
  companyCountry: string;

  @Column()
  companyCity: string;

  @Column()
  userPosition: string;

  @Column()
  userGradeYears: number;

  @Column()
  userGradeMonths: number;

  @Column()
  isAnonym: number;

  @Column()
  isRecommended: number;

  @Column('text')
  reasonJoined: string;

  @Column('text')
  reasonLeft: string;

  // Связи с подформами
  @OneToOne(() => TaskForm, { cascade: true, eager: true })
  @JoinColumn()
  task: TaskForm;

  @OneToOne(() => InterviewForm, { cascade: true, eager: true })
  @JoinColumn()
  interview: InterviewForm;

  @OneToOne(() => InternshipForm, { cascade: true, eager: true })
  @JoinColumn()
  internship: InternshipForm;

  @OneToOne(() => WorkForm, { cascade: true, eager: true })
  @JoinColumn()
  work: WorkForm;

  @CreateDateColumn()
  createdAt: Date;
}
