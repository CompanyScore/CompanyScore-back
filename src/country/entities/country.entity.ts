import { City } from 'src/city/entities/city.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => City, city => city.country)
  cities: City[];
}
