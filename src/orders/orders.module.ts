import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.domain';
import { OrderDetail } from './domain/orderDetail.domain';

@Module({ imports: [TypeOrmModule.forFeature([Order, OrderDetail])] })
export class OrdersModule {}
