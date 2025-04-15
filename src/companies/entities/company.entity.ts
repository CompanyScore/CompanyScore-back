import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  logo?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column()
  description?: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @CreateDateColumn()
  createDate: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  // Связь с комментариями
  @OneToMany(() => Comment, (comment) => comment.company)
  comments?: Comment[];
}
