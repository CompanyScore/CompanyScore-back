import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Award {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;
}
