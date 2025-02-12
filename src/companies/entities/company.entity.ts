import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @Column()
  logoPath?: string;

  @Column()
  description?: string;

  @Column()
  country?: string;

  @Column()
  city?: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: false })
  isDeleted?: boolean;

  // Связь с комментариями
  @OneToMany(() => Comment, (comment) => comment.company)
  comments?: Comment[];
}
