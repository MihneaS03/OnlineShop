import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../domain/customer.domain';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getById(id: string): Promise<Customer | null> {
    const customer: Customer = await this.customerRepository.getById(id);
    if (!customer) {
      throw new NotFoundException('The customer was not found');
    }
    return customer;
  }

  async getAll(): Promise<Customer[]> {
    return this.customerRepository.getAll();
  }

  async create(customer: Customer): Promise<Customer> {
    return await this.customerRepository.create(customer);
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.remove(id);
  }
}
