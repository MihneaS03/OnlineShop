import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.domain';
import { OrderDetail } from './domain/order-detail.domain';
import { CustomersModule } from '../customers/customers.module';
import { OrderRepository } from './repository/order.repository';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderMapper } from './mapper/order.mapper';
import { OrderDetailRepository } from './repository/order-detail.repository';
import { OrderDetailService } from './service/order-detail.service';
import { OrderDetailMapper } from './mapper/order-detail.mapper';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    CustomersModule,
    ProductsModule,
  ],
  providers: [
    OrderRepository,
    OrderService,
    OrderMapper,
    OrderDetailRepository,
    OrderDetailService,
    OrderDetailMapper,
  ],
  controllers: [OrderController],
})
export class OrdersModule {}
