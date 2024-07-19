import { OrderDetail } from 'src/orders/domain/order-detail.domain';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stock } from './stock.domain';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Address.Country' })
  addressCountry: string;

  @Column({ name: 'Address.City' })
  addressCity: string;

  @Column({ name: 'Address.County' })
  addressCounty: string;

  @Column({ name: 'Address.StreetAddress' })
  addressStreet: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.location)
  orderDetails: OrderDetail[];

  @OneToMany(() => Stock, (stock) => stock.location)
  stocks: Stock[];
}
