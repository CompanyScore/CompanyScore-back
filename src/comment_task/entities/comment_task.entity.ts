import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment_task')
export class TaskForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isTask: boolean;

  @Column()
  requirementsForTask: number;

  @Column()
  taskLevel: number;

  @Column()
  fairAssessment: number;

  @Column()
  taskSize: number;

  @Column()
  realWork: number;

  @Column()
  feedback: number;
}
