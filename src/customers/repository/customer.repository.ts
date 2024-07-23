import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/customer.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async getById(id: string): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ id });
  }

  getCustomerByUsername(username: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { username } });
  }

  async create(customer: Customer): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
