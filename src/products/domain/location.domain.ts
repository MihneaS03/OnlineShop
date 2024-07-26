import { OrderDetail } from '../../orders/domain/order-detail.domain';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stock } from './stock.domain';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'address_country' })
  addressCountry: string;

  @Column({ name: 'address_city' })
  addressCity: string;

  @Column({ name: 'address_county' })
  addressCounty: string;

  @Column({ name: 'address_street' })
  addressStreet: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.shippedFrom)
  orderDetails: OrderDetail[];

  @OneToMany(() => Stock, (stock) => stock.location)
  stocks: Stock[];

  constructor(
    name: string,
    addressCountry: string,
    addressCity: string,
    addressCounty: string,
    addressStreet: string,
  ) {
    this.name = name;
    this.addressCountry = addressCountry;
    this.addressCity = addressCity;
    this.addressCounty = addressCounty;
    this.addressStreet = addressStreet;
  }
}
