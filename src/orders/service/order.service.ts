import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { Order } from '../domain/order.domain';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAllOrders();
  }

  getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.getOrderById(id);
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
