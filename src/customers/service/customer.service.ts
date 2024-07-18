import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/customer.domain';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  getCustomerById(id: string): Promise<Customer | null> {
    return this.customerRepository.getCustomerById(id);
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
