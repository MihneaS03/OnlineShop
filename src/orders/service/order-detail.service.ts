import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailRepository } from '../repository/order-detail.repository';
import { OrderDetail } from '../domain/order-detail.domain';

@Injectable()
export class OrderDetailService {
  constructor(private readonly orderDetailRepository: OrderDetailRepository) {}

  getAllOrderDetails(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.getAllOrderDetails();
  }

  async getOrderDetailById(
    orderId: string,
    productId: string,
  ): Promise<OrderDetail | null> {
    const orderDetail: OrderDetail =
      await this.orderDetailRepository.getOrderDetailById(orderId, productId);
    if (!orderDetail) {
      throw new NotFoundException('The order detail was not found');
    }
    return orderDetail;
  }

  async createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
    return await this.orderDetailRepository.createOrderDetail(orderDetail);
  }

  async updateOrderDetail(
    orderId: string,
    productId: string,
    newOrderDetail: OrderDetail,
  ): Promise<OrderDetail> {
    return await this.orderDetailRepository.updateOrderDetail(
      orderId,
      productId,
      newOrderDetail,
    );
  }

  async removeOrderDetail(orderId: string, productId: string): Promise<void> {
    await this.orderDetailRepository.removeOrderDetail(orderId, productId);
  }
}
