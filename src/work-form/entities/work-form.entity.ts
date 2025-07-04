import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkEducationItem } from './work-education-item.entity';
import { WorkSocialBenefitItem } from './work-social-benefit-item.entity';

@Entity()
export class WorkForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // PRIMARY
  @Column({ type: 'date' })
  primaryFrom: Date;

  @Column({ type: 'date' })
  primaryTo: Date;

  @Column()
  primaryManagement: number;

  @Column()
  primaryTeam: number;

  @Column()
  primaryProject: number;

  @Column()
  primaryStack: number;

  @Column()
  primaryWorkingSchedule: number;

  @Column()
  primaryWorkFormat: number;

  @Column()
  primaryStability: number;

  @Column()
  primarySalaryPoints: number;

  @Column()
  primarySalaryValue: number;

  // SECONDARY
  @Column()
  secondaryDevelopment: number;

  @Column()
  secondaryComfort: number;

  @Column()
  secondaryDiscrimination: number;

  @Column()
  secondaryEthics: number;

  @Column()
  secondaryPerformanceReview: number;

  @Column()
  secondaryEvents: number;

  @OneToMany(() => WorkEducationItem, item => item.workForm, {
    cascade: true,
    eager: true,
  })
  educationItems: WorkEducationItem[];

  // FINANCE
  @Column()
  financeBonusesPoints: number;

  @Column()
  financeBonusesValue: number;

  @Column()
  financeMedicinePoints: number;

  @Column()
  financeMedicineValue: number;

  @Column()
  financeProfitSharePoints: number;

  @Column()
  financeProfitShareValue: number;

  @OneToMany(() => WorkSocialBenefitItem, item => item.workForm, {
    cascade: true,
    eager: true,
  })
  socialBenefits: WorkSocialBenefitItem[];
}
