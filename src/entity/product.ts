import {
  Entity,
  Column,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quotation } from './quotation';

@Entity({ name: 'products' })
@Unique(['reference'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  category: string;

  @Column('text')
  image: string;

  @Column('text')
  reference: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Quotation, (quotation) => quotation.product_id)
  quotations: Quotation[];
}
