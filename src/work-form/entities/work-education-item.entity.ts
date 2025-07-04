import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { WorkForm } from './work-form.entity';

@Entity()
export class WorkEducationItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  educationId: string; // ID из справочника work_education

  @ManyToOne(() => WorkForm, work => work.educationItems)
  workForm: WorkForm;
}
