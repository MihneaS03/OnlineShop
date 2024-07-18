import { Module } from '@nestjs/common';
import { Product } from './domain/product.domain';
import { ProductCategory } from './domain/productCategory.domain';
import { Stock } from './domain/stock.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './domain/location.domain';
import { ProductCategoryRepository } from './repository/productCategory.repository';
import { ProductCategoryService } from './service/productCategory.service';
import { ProductCategoryMapper } from './mapper/productCategory.mapper';
import { ProductCategoryController } from './controller/productCategory.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, Stock, Location]),
  ],
  providers: [
    ProductCategoryRepository,
    ProductCategoryService,
    ProductCategoryMapper,
  ],
  controllers: [ProductCategoryController],
})
export class ProductsModule {}
