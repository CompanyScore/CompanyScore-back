import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { InterviewForm } from './interview-form.entity';

@Entity()
export class InterviewFormStageItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InterviewForm, interviewForm => interviewForm.stages, {
    onDelete: 'CASCADE',
  })
  interviewForm: InterviewForm;

  @Column()
  stageId: string; // ID из справочника InterviewStage
}
