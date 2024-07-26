import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderDetail } from './order-detail.domain';
import { Customer } from '../../customers/domain/customer.domain';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'address_country' })
  addressCountry: string;

  @Column({ name: 'address_city' })
  addressCity: string;

  @Column({ name: 'address_county' })
  addressCounty: string;

  @Column({ name: 'address_street' })
  addressStreet: string;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  @JoinColumn({ name: 'customer' })
  customer: Customer;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  constructor(
    customer: Customer,
    addressCountry: string,
    addressCity: string,
    addressCounty: string,
    addressStreet: string,
    createdAt?: Date,
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.addressCountry = addressCountry;
    this.addressCity = addressCity;
    this.addressCounty = addressCounty;
    this.addressStreet = addressStreet;
  }
}
