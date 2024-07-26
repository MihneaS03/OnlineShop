import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../domain/customer.domain';
import { CustomerRepository } from '../repository/customer.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getAll(): Promise<Customer[]> {
    return this.customerRepository.getAll();
  }

  async getById(id: string): Promise<Customer | null> {
    const customer: Customer = await this.customerRepository.getById(id);
    if (!customer) {
      throw new NotFoundException('The customer was not found');
    }
    return customer;
  }

  async getByUsername(username: string): Promise<Customer | null> {
    const customer: Customer =
      await this.customerRepository.getByUsername(username);
    if (!customer) {
      throw new NotFoundException('The customer was not found');
    }
    return customer;
  }

  async create(customer: Customer): Promise<Customer> {
    const hashedPassword = await bcrypt.hash(customer.password, 10);
    return await this.customerRepository.create({
      ...customer,
      password: hashedPassword,
    });
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.remove(id);
  }
}
