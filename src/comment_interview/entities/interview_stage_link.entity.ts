import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { CommentInterview } from './comment_interview.entity';
import { InterviewStage } from 'src/interview_stage/entities/interview_stage.entity';

@Entity('interview_stage_link')
export class InterviewStageLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CommentInterview, interviewForm => interviewForm.stages, {
    onDelete: 'CASCADE',
  })
  commentInterview: CommentInterview;

  @ManyToOne(() => InterviewStage, { eager: true })
  @JoinColumn({ name: 'stageId' })
  stage: InterviewStage;

  @Column()
  stageId: string;
}
