import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../domain/customer.domain';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getCustomerById(id: string): Promise<Customer | null> {
    const customer: Customer =
      await this.customerRepository.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException('The customer was not found');
    }
    return customer;
  }

  getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.getAllCustomers();
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.customerRepository.createCustomer(customer);
  }

  async removeCustomer(id: string): Promise<void> {
    await this.customerRepository.removeCustomer(id);
  }
}
