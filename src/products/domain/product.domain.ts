import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductCategory } from './product-category.domain';
import { OrderDetail } from 'src/orders/domain/order-detail.domain';
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

  @Column({ name: 'Weight', type: 'decimal' })
  weight: number;

  @Column({ name: 'Supplier' })
  supplier: string;

  @Column({ name: 'ImageUrl' })
  imageUrl: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'Category' })
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
