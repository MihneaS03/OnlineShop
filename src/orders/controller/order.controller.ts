import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderMapper } from '../mapper/order.mapper';
import { Order } from '../domain/order.domain';
import { OrderDTO } from '../dto/order.dto';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { CustomerService } from 'src/customers/service/customer.service';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CustomerMapper } from 'src/customers/mapper/customer.mapper';

@Controller('orders')
export class OrderController {
  private readonly orderMapper: OrderMapper;
  private readonly customerMapper: CustomerMapper;

  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
  ) {
    this.orderMapper = new OrderMapper();
    this.customerMapper = new CustomerMapper();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The orders were succesfully retrieved',
  })
  async getAllOrders(): Promise<OrderDTO[]> {
    const allOrders: Order[] = await this.orderService.getAllOrders();
    const allOrdersDTO: OrderDTO[] = [];

    for (const order of allOrders) {
      const customer = await this.customerService.getCustomerById(
        order.customer.id,
      );

      allOrdersDTO.push(
        this.orderMapper.mapOrderToOrderDTO(
          order,
          this.customerMapper.mapCustomerToCustomerDTO(customer),
        ),
      );
    }

    return allOrdersDTO;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The order was succesfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The order was not found',
  })
  async getOrderById(@Param('id') id: string): Promise<OrderDTO> {
    const order: Order = await this.orderService.getOrderById(id);
    const customer = await this.customerService.getCustomerById(
      order.customer.id,
    );

    return this.orderMapper.mapOrderToOrderDTO(
      order,
      this.customerMapper.mapCustomerToCustomerDTO(customer),
    );
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order was succesfully created',
  })
  async createOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    const customer = await this.customerService.getCustomerById(
      createOrderDTO.customer,
    );
    return await this.orderService.createOrder(
      this.orderMapper.mapCreateOrderDTOToOrder(createOrderDTO, customer),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The order was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The order was not found',
  })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<Order> {
    const customer = await this.customerService.getCustomerById(
      updateOrderDTO.customer,
    );
    return await this.orderService.updateOrder(
      id,
      this.orderMapper.mapUpdateOrderDTOToOrder(updateOrderDTO, customer),
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The order was succesfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The order was not found',
  })
  async removeOrder(@Param('id') id: string) {
    await this.orderService.removeOrder(id);
  }
}
