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

  getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  getCustomerById(id: string): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ id });
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }

  async removeCustomer(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
