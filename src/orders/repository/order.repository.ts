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

  async getAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getById(id: string): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }

  async create(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }

  async update(id: string, newOrder: Order): Promise<Order> {
    newOrder.id = id;
    return await this.orderRepository.save(newOrder);
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
