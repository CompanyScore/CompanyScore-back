import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('work_education')
export class WorkEducation {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @Column()
  number: number;

  @Column()
  mark: number;
}
