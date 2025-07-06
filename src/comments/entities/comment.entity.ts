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
import { CommentTask } from 'src/comment_task/entities/comment_task.entity';
import { CommentInterview } from 'src/comment_interview/entities/comment_interview.entity';
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
  @OneToOne(() => CommentTask, { cascade: true, eager: true })
  @JoinColumn()
  task: CommentTask;

  @OneToOne(() => CommentInterview, { cascade: true, eager: true })
  @JoinColumn()
  interview: CommentInterview;

  @OneToOne(() => InternshipForm, { cascade: true, eager: true })
  @JoinColumn()
  internship: InternshipForm;

  @OneToOne(() => WorkForm, { cascade: true, eager: true })
  @JoinColumn()
  work: WorkForm;

  @CreateDateColumn()
  createdAt: Date;
}
