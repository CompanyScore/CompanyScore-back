import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Country } from 'src/country/entities/country.entity';
import { City } from 'src/city/entities/city.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  logo?: string;

  @ManyToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City)
  @JoinColumn()
  city: City;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'float', default: 0 })
  rating?: number;

  @OneToMany(() => Branch, branch => branch.company)
  branches: Branch[];

  @CreateDateColumn()
  createDate: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  // Связь с комментариями
  @OneToMany(() => Comment, comment => comment.company)
  comments?: Comment[];
}
