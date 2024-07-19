import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.domain';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Description' })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
