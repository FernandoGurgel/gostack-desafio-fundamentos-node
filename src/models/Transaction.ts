import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('float4')
  value: number;

  @Column('enum')
  type: 'income' | 'outcome';
}

export default Transaction;
