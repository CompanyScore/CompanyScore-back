import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment_work_finance')
export class CommentWorkFinance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  bonusesPoints: number;

  @Column({ type: 'int' })
  bonusesValue: number;

  @Column({ type: 'int' })
  medicinePoints: number;

  @Column({ type: 'int' })
  medicineValue: number;

  @Column({ type: 'int' })
  profitSharePoints: number;

  @Column({ type: 'int' })
  profitShareValue: number;

  @Column()
  isFreeMealsSocial: boolean;

  @Column()
  isTransportSocial: boolean;

  @Column()
  isHousingSocial: boolean;

  @Column()
  isHolidayBonusSocial: boolean;

  @Column()
  isEducationSocial: boolean;

  @Column()
  isChildAllowanceSocial: boolean;

  @Column()
  isFinancialAssistSocial: boolean;
}
