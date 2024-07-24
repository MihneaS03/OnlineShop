import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductCategory } from './product-category.domain';
import { OrderDetail } from '../../orders/domain/order-detail.domain';
import { Stock } from './stock.domain';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ type: 'decimal' })
  weight: number;

  @Column()
  supplier: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'category' })
  category: ProductCategory;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    supplier: string,
    imageUrl: string,
    category: ProductCategory,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
    this.category = category;
  }
}
