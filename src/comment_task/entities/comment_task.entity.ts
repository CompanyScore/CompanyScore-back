import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment_task')
export class CommentTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'int', default: 0 })
  rating: number;
}
