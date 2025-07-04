import { Company } from 'src/companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  createDate: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @ManyToOne(() => Company, company => company.branches)
  company: Company;
}
