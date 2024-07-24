import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from '../repository/customer.repository';
import { Customer } from '../domain/customer.domain';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: jest.Mocked<CustomerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            getByUsername: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });
});
