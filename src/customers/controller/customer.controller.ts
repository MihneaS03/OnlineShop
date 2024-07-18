import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';
import { CustomerDTO } from '../dto/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  @Get()
  async getAllCustomers(): Promise<CustomerDTO[]> {
    const allCustomers: Customer[] =
      await this.customerService.getAllCustomers();
    return allCustomers.map((customer) =>
      this.customerMapper.mapCustomerToCustomerDTO(customer),
    );
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerDTO> {
    const customer: Customer = await this.customerService.getCustomerById(id);
    return this.customerMapper.mapCustomerToCustomerDTO(customer);
  }

  @Post()
  async createCustomer(
    @Body() createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return await this.customerService.createCustomer(
      this.customerMapper.mapCreateCustomerDTOToCustomer(createCustomerDTO),
    );
  }
}
