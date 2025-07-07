import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { CommentWork } from './comment_work.entity';

@Entity('work_social_benefit_link')
export class WorkSocialBenefitLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  benefitId: string; // ID из справочника work_social_benefit

  @ManyToOne(() => CommentWork, work => work.socialBenefits)
  @JoinColumn({ name: 'commentWorkId' })
  commentWork: CommentWork;
}
