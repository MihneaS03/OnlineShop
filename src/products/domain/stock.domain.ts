import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Product } from '../../products/domain/product.domain';
import { Location } from '../../products/domain/location.domain';

@Entity()
export class Stock {
  @PrimaryColumn('uuid', { name: 'product' })
  productId: string;

  @PrimaryColumn('uuid', { name: 'location' })
  locationId: string;

  @ManyToOne(() => Product, (product) => product.stocks, { eager: true })
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.stocks, { eager: true })
  @JoinColumn({ name: 'location' })
  location: Location;

  @Column()
  quantity: number;

  constructor(productId: string, locationId: string, quantity: number) {
    this.productId = productId;
    this.locationId = locationId;
    this.quantity = quantity;
  }
}
