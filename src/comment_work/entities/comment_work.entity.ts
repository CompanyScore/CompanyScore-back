import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkEducationLink } from './work_education_link.entity';
import { WorkSocialBenefitLink } from './work_social_benefit_link.entity';

@Entity('comment_work')
export class CommentWork {
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

  @OneToMany(() => WorkEducationLink, item => item.commentWork, {
    cascade: true,
    eager: true,
  })
  educations: WorkEducationLink[];

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

  @OneToMany(() => WorkSocialBenefitLink, item => item.commentWork, {
    cascade: true,
    eager: true,
  })
  socialBenefits: WorkSocialBenefitLink[];
}
