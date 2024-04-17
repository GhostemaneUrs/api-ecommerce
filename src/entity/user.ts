import { Quotation } from './quotation';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column('text')
  email: string;

  @Column('text')
  code: string;

  @Column('text')
  phone: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Quotation, (quotation) => quotation.user_id)
  quotations: Quotation[];
}
