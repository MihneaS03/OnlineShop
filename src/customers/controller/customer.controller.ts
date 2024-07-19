import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';
import { CustomerDTO } from '../dto/customer.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The customers were succesfully retrieved',
  })
  async getAllCustomers(): Promise<CustomerDTO[]> {
    const allCustomers: Customer[] =
      await this.customerService.getAllCustomers();
    return allCustomers.map((customer) =>
      this.customerMapper.mapCustomerToCustomerDTO(customer),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The customer was succesfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The customer was not found',
  })
  async getCustomerById(@Param('id') id: string): Promise<CustomerDTO> {
    const customer: Customer = await this.customerService.getCustomerById(id);
    return this.customerMapper.mapCustomerToCustomerDTO(customer);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The customer was succesfully created',
  })
  async createCustomer(
    @Body() createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return await this.customerService.createCustomer(
      this.customerMapper.mapCreateCustomerDTOToCustomer(createCustomerDTO),
    );
  }
}
