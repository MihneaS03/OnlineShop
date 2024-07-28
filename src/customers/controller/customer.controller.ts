import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';
import { CustomerDTO } from '../dto/customer.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/constants/auth.constants';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The customers were succesfully retrieved',
    type: [CustomerDTO],
  })
  async getAll(): Promise<CustomerDTO[]> {
    const allCustomers: Customer[] = await this.customerService.getAll();
    return allCustomers.map((customer) => CustomerMapper.toDTO(customer));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The customer was succesfully retrieved',
    type: CustomerDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'The customer was not found',
  })
  async getById(@Param('id') id: string): Promise<CustomerDTO | null> {
    const customer: Customer = await this.customerService.getById(id);
    return CustomerMapper.toDTO(customer);
  }

  @Post()
  @Public()
  @ApiResponse({
    status: 201,
    description: 'The customer was succesfully created',
    type: CustomerDTO,
  })
  async create(
    @Body() createCustomerDTO: CreateCustomerDTO,
  ): Promise<CustomerDTO> {
    const createdCustomer: Customer = await this.customerService.create(
      CustomerMapper.toEntity(createCustomerDTO),
    );

    return CustomerMapper.toDTO(createdCustomer);
  }
}
