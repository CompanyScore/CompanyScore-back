import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('interview_stage')
export class InterviewStage {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @Column()
  number: number;

  @Column()
  mark: number;
}
