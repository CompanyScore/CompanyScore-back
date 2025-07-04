import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InterviewFormStageItem } from './interview-form-stage-item.entity';

@Entity()
export class InterviewForm {
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

  @OneToMany(() => InterviewFormStageItem, item => item.interviewForm, {
    cascade: true,
    eager: true,
  })
  stages: InterviewFormStageItem[];
}
