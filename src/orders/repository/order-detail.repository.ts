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

  getAllOrderDetails(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find();
  }

  getAllOrderDetailsOfOrder(orderId: string) {
    return this.orderDetailRepository.find({
      where: { orderId },
    });
  }

  getOrderDetailById(
    orderId: string,
    productId: string,
  ): Promise<OrderDetail | null> {
    return this.orderDetailRepository.findOne({
      where: { orderId, productId },
    });
  }

  async createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
    return await this.orderDetailRepository.save(orderDetail);
  }

  async updateOrderDetail(
    orderId: string,
    productId: string,
    newOrderDetail: OrderDetail,
  ): Promise<OrderDetail> {
    newOrderDetail.orderId = orderId;
    newOrderDetail.productId = productId;
    return await this.orderDetailRepository.save(newOrderDetail);
  }

  async removeOrderDetail(orderId: string, productId: string): Promise<void> {
    await this.orderDetailRepository.delete({ orderId, productId });
  }
}
