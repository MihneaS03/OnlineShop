import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.domain';
import { Product } from '../../products/domain/product.domain';
import { Location } from '../../products/domain/location.domain';

@Entity()
export class OrderDetail {
  @PrimaryColumn('uuid', { name: 'order' })
  orderId: string;

  @PrimaryColumn('uuid', { name: 'product' })
  productId: string;

  @ManyToOne(() => Order, (order) => order.orderDetails, { eager: true })
  @JoinColumn({ name: 'order' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, { eager: true })
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.orderDetails, {
    eager: true,
  })
  @JoinColumn({ name: 'shipped_from' })
  shippedFrom: Location;

  @Column()
  quantity: number;

  constructor(
    orderId: string,
    productId: string,
    shippedFrom: Location,
    quantity: number,
  ) {
    this.orderId = orderId;
    this.productId = productId;
    this.shippedFrom = shippedFrom;
    this.quantity = quantity;
  }
}
