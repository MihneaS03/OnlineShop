import { Customer } from 'src/customers/domain/customer.domain';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderDetail } from './orderDetail.domain';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'CreatedAt' })
  createdAt: Date;

  @Column({ name: 'Address.Country' })
  addressCountry: string;

  @Column({ name: 'Address.City' })
  addressCity: string;

  @Column({ name: 'Address.County' })
  addressCounty: string;

  @Column({ name: 'Address.StreetAddress' })
  addressStreet: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'Customer' })
  customer: Customer;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
