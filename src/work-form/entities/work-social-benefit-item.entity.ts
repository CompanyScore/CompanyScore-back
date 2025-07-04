import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { WorkForm } from './work-form.entity';

@Entity()
export class WorkSocialBenefitItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  benefitId: string; // ID из справочника work_social_benefit

  @ManyToOne(() => WorkForm, work => work.socialBenefits)
  workForm: WorkForm;
}
