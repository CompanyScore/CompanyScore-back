import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InterviewStageLink } from './interview_stage_link.entity';

@Entity('comment_interview')
export class CommentInterview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isInterview: boolean;

  @Column()
  correspondedPosition: number;

  @Column()
  clearlyStages: number;

  @Column()
  talkedPolitely: number;

  @Column()
  realWork: number;

  @Column()
  interviewTime: number;

  @Column()
  feedback: number;

  @OneToMany(() => InterviewStageLink, item => item.commentInterview, {
    cascade: true,
    eager: true,
  })
  stages: InterviewStageLink[];
}
