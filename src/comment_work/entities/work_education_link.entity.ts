import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { CommentWork } from './comment_work.entity';

@Entity('work_education_link')
export class WorkEducationLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  educationId: string; // ID из справочника work_education

  @ManyToOne(() => CommentWork, work => work.educations)
  @JoinColumn({ name: 'commentWorkId' })
  commentWork: CommentWork;
}
