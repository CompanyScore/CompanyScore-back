import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Country } from 'src/country/entities/country.entity';
import { City } from 'src/city/entities/city.entity';
import { Award } from 'src/awards/entities/award.entity';
import { CompanyStatuses, CompanyTypes } from 'src/constants';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  logo?: string;

  @Column()
  slug: string;

  @ManyToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City)
  @JoinColumn()
  city: City;

  @Column()
  legal_name: string;

  @Column()
  industry: string;

  @Column()
  size: string;

  @Column()
  website: string;

  @Column({ type: 'float', default: 0 })
  rating?: number;

  @ManyToOne(() => Company, company => company, { nullable: true })
  parent?: Company;

  @Column({
    type: 'enum',
    enum: CompanyTypes,
    default: CompanyTypes.SUBSIDIARY,
  })
  type: CompanyTypes;

  @OneToMany(() => Award, award => award, { nullable: true })
  awards?: Award[];

  @Column({
    type: 'enum',
    enum: CompanyStatuses,
    default: CompanyStatuses.ACTIVE,
  })
  status: CompanyStatuses;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Связь с комментариями
  @OneToMany(() => Comment, comment => comment.company)
  comments?: Comment[];
}
