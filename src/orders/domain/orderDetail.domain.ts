import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.domain';
import { Product } from 'src/products/domain/product.domain';
import { Location } from 'src/products/domain/location.domain';

@Entity()
export class OrderDetail {
  @PrimaryColumn('uuid', { name: 'Order' })
  orderId: string;

  @PrimaryColumn('uuid', { name: 'Product' })
  productId: string;

  @ManyToOne(() => Order, (order) => order.orderDetails, { eager: true })
  @JoinColumn({ name: 'Order' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, { eager: true })
  @JoinColumn({ name: 'Product' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.orderDetails, {
    eager: true,
  })
  @JoinColumn({ name: 'ShippedFrom' })
  location: Location;

  @Column({ name: 'Quantity' })
  quantity: number;
}
