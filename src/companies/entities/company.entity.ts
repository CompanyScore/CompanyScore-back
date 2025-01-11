import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  rating: number;

  @Column({ default: false })
  isDeleted: boolean;
}
