import { Module } from '@nestjs/common';
import { Product } from './domain/product.domain';
import { ProductCategory } from './domain/product-category.domain';
import { Stock } from './domain/stock.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './domain/location.domain';
import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductCategoryService } from './service/product-category.service';
import { ProductCategoryMapper } from './mapper/product-category.mapper';
import { ProductCategoryController } from './controller/product-category.controller';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { ProductMapper } from './mapper/product.mapper';
import { StockRepository } from './repository/stock.repository';
import { StockService } from './service/stock.service';
import { StockMapper } from './mapper/stock.mapper';
import { StockController } from './controller/stock.controller';
import { LocationService } from './service/location.service';
import { LocationRepository } from './repository/location.repository';
import { LocationMapper } from './mapper/location.mapper';

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
    LocationRepository,
    LocationService,
    LocationMapper,
  ],
  controllers: [ProductController, ProductCategoryController, StockController],
  exports: [ProductService, LocationService],
})
export class ProductsModule {}
