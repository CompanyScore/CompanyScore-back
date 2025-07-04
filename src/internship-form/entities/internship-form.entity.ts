import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InternshipForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isInternship: boolean;

  @Column({ type: 'date' })
  periodFrom: Date;

  @Column({ type: 'date' })
  periodTo: Date;

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
