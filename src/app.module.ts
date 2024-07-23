import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './customers/domain/customer.domain';
import { Order } from './orders/domain/order.domain';
import { OrderDetail } from './orders/domain/order-detail.domain';
import { Product } from './products/domain/product.domain';
import { ProductCategory } from './products/domain/product-category.domain';
import { Stock } from './products/domain/stock.domain';
import { Location } from './products/domain/location.domain';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    CustomersModule,
    SharedModule,
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'msgcsuser',
          password: 'msgcspass',
          database: 'msgcsdb',
          entities: [
            Customer,
            Order,
            OrderDetail,
            Product,
            ProductCategory,
            Stock,
            Location,
          ],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
