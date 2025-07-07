import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('work_social_benefit')
export class WorkSocialBenefit {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @Column()
  number: number;

  @Column()
  mark: number;
}
