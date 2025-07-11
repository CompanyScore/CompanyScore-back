import { City } from 'src/city/entities/city.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Country } from 'src/country/entities/country.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City)
  @JoinColumn()
  city: City;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'float', default: 0 })
  rating?: number;

  @CreateDateColumn()
  createDate: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @ManyToOne(() => Company, company => company.branches)
  company: Company;
}
