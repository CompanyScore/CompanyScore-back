import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment_work_primary')
export class CommentWorkPrimary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  dateFrom: Date;

  @Column({ type: 'date' })
  dateTo: Date;

  @Column({ type: 'int' })
  management: number;

  @Column({ type: 'int' })
  team: number;

  @Column({ type: 'int' })
  project: number;

  @Column({ type: 'int' })
  stack: number;

  @Column({ type: 'int' })
  workingSchedule: number;

  @Column({ type: 'int' })
  workFormat: number;

  @Column({ type: 'int' })
  stability: number;

  @Column({ type: 'int' })
  salaryPoints: number;

  @Column({ type: 'int' })
  salaryValue: number;
}
