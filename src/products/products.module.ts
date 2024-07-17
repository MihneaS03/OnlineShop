import { Module } from '@nestjs/common';
import { Product } from './domain/product.domain';
import { ProductCategory } from './domain/productCategory.domain';
import { Stock } from './domain/stock.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './domain/location.domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, Stock, Location]),
  ],
})
export class ProductsModule {}
