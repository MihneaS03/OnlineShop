import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { Order } from '../domain/order.domain';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAllOrders();
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order: Order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new NotFoundException('The order was not found');
    }
    return order;
  }

  async createOrder(order: Order): Promise<Order> {
    order.createdAt = new Date();
    return await this.orderRepository.createOrder(order);
  }

  async updateOrder(id: string, newOrder: Order): Promise<Order> {
    return await this.orderRepository.updateOrder(id, newOrder);
  }

  async removeOrder(id: string): Promise<void> {
    await this.orderRepository.removeOrder(id);
  }
}
