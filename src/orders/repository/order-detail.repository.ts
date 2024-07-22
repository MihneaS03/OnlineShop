import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from '../domain/order-detail.domain';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async getAll(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find();
  }

  async getAllOfOrder(orderId: string): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find({
      where: { orderId },
    });
  }

  async getById(
    orderId: string,
    productId: string,
  ): Promise<OrderDetail | null> {
    return this.orderDetailRepository.findOne({
      where: { orderId, productId },
    });
  }

  async create(orderDetail: OrderDetail): Promise<OrderDetail> {
    return await this.orderDetailRepository.save(orderDetail);
  }

  async update(
    orderId: string,
    productId: string,
    newOrderDetail: OrderDetail,
  ): Promise<OrderDetail> {
    newOrderDetail.orderId = orderId;
    newOrderDetail.productId = productId;
    return await this.orderDetailRepository.save(newOrderDetail);
  }

  async remove(orderId: string, productId: string): Promise<void> {
    await this.orderDetailRepository.delete({ orderId, productId });
  }
}
