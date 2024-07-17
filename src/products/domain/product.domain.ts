import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductCategory } from './productCategory.domain';
import { OrderDetail } from 'src/orders/domain/orderDetail.domain';
import { Stock } from './stock.domain';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Description' })
  description: string;

  @Column({ name: 'Price' })
  price: number;

  @Column({ name: 'Weight' })
  weight: number;

  @Column({ name: 'Supplier' })
  supplier: string;

  @Column({ name: 'ImageUrl' })
  imageUrl: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
  )
  @JoinColumn({ name: 'Category' })
  category: ProductCategory;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];
}
