import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment_internship')
export class CommentInternship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isInternship: boolean;

  @Column({ type: 'date' })
  dateFrom: Date;

  @Column({ type: 'date' })
  dateTo: Date;

  @Column()
  isUseful: number;

  @Column()
  clearlyOrganized: number;

  @Column()
  correspondedInternLevel: number;

  @Column()
  developingAssignment: number;

  @Column()
  supportSupervisor: number;

  @Column()
  isPaid: number;

  @Column()
  isOffer: number;
}
