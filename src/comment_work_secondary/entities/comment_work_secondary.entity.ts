import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment_work_secondary')
export class CommentWorkSecondary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  development: number;

  @Column()
  comfort: number;

  @Column()
  discrimination: number;

  @Column()
  ethics: number;

  @Column()
  performanceReview: number;

  @Column()
  events: number;

  @Column()
  isOnlineCoursesEdu: boolean;

  @Column()
  isOfflineCoursesEdu: boolean;

  @Column()
  isTrainingsEdu: boolean;

  @Column()
  isBusinessTripsEdu: boolean;

  @Column()
  isPartUniPayEdu: boolean;

  @Column()
  isFullUniPayEdu: boolean;
}
