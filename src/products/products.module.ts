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
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { ProductMapper } from './mapper/product.mapper';
import { StockRepository } from './repository/stock.repository';
import { StockService } from './service/stock.service';
import { StockMapper } from './mapper/stock.mapper';
import { StockController } from './controller/stock.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, Stock, Location]),
  ],
  providers: [
    ProductRepository,
    ProductService,
    ProductMapper,
    ProductCategoryRepository,
    ProductCategoryService,
    ProductCategoryMapper,
    StockRepository,
    StockService,
    StockMapper,
  ],
  controllers: [ProductController, ProductCategoryController, StockController],
})
export class ProductsModule {}
