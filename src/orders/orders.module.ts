import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.domain';
import { OrderDetail } from './domain/orderDetail.domain';
import { CustomersModule } from 'src/customers/customers.module';
import { OrderRepository } from './repository/order.repository';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderMapper } from './mapper/order.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail]), CustomersModule],
  providers: [OrderRepository, OrderService, OrderMapper],
  controllers: [OrderController],
})
export class OrdersModule {}
