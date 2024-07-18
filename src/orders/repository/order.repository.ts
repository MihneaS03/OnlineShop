import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../domain/order.domain';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['customer'] });
  }

  getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
  }

  async createOrder(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }

  async updateOrder(id: string, newOrder: Order): Promise<Order> {
    newOrder.id = id;
    return await this.orderRepository.save(newOrder);
  }

  async removeOrder(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
