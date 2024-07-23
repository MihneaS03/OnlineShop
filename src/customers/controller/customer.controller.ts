import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';
import { CustomerDTO } from '../dto/customer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/constants/auth.constants';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The customers were succesfully retrieved',
  })
  async getAll(): Promise<CustomerDTO[]> {
    const allCustomers: Customer[] = await this.customerService.getAll();
    return allCustomers.map((customer) => CustomerMapper.toDTO(customer));
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
  async getById(@Param('id') id: string): Promise<CustomerDTO> {
    const customer: Customer = await this.customerService.getById(id);
    return CustomerMapper.toDTO(customer);
  }

  @Post()
  @Public()
  @ApiResponse({
    status: 201,
    description: 'The customer was succesfully created',
  })
  async create(
    @Body() createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return await this.customerService.create(
      CustomerMapper.toEntity(createCustomerDTO),
    );
  }
}
