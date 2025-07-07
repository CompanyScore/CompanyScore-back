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
import { CommentInternship } from 'src/comment_internship/entities/comment_internship.entity';
import { CommentWork } from 'src/comment_work/entities/comment_work.entity';
import { Position } from 'src/positions/entities/position.entity';

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

  @ManyToOne(() => Position, { eager: true })
  @JoinColumn({ name: 'userPositionId' })
  userPosition: Position;

  @Column()
  userPositionId: string;

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

  @OneToOne(() => CommentInternship, { cascade: true, eager: true })
  @JoinColumn()
  internship: CommentInternship;

  @OneToOne(() => CommentWork, { cascade: true, eager: true })
  @JoinColumn()
  work: CommentWork;

  @CreateDateColumn()
  createdAt: Date;
}
