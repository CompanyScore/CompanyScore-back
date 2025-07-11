import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  isTestStage: boolean;

  @Column()
  isVideoStage: boolean;

  @Column()
  isHrStage: boolean;

  @Column()
  isTaskStage: boolean;

  @Column()
  isTechStage: boolean;

  @Column()
  isTeamStage: boolean;

  @Column()
  isFinalStage: boolean;
}
