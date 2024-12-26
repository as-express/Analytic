import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  saled: number;
}
