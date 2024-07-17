import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Product } from 'src/products/domain/product.domain';
import { Location } from 'src/products/domain/location.domain';

@Entity()
export class Stock {
  @PrimaryColumn('uuid', { name: 'Product' })
  productId: string;

  @PrimaryColumn('uuid', { name: 'Location' })
  locationId: string;

  @ManyToOne(() => Product, (product) => product.stocks)
  @JoinColumn({ name: 'Product' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.stocks)
  @JoinColumn({ name: 'Location' })
  location: Location;

  @Column({ name: 'Quantity' })
  quantity: number;
}
