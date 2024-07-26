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
import { CustomerService } from '../../customers/service/customer.service';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerMapper } from '../../customers/mapper/customer.mapper';
import { OrderDetailMapper } from '../mapper/order-detail.mapper';
import { LocationService } from '../../products/service/location.service';
import { OrderDetail } from '../domain/order-detail.domain';
import { Location } from '../../products/domain/location.domain';
import { UpdateOrderDetailDTO } from '../dto/update-order-detail.dto';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The orders were succesfully retrieved',
  })
  async getAll(): Promise<OrderDTO[]> {
    const allOrders: Order[] = await this.orderService.getAll();

    return await Promise.all(
      allOrders.map(async (order) => {
        const customer = await this.customerService.getById(order.customer.id);
        return OrderMapper.toDTO(order, CustomerMapper.toDTO(customer));
      }),
    );
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
  async getById(@Param('id') id: string): Promise<OrderDTO> {
    const order: Order = await this.orderService.getById(id);
    const customer = await this.customerService.getById(order.customer.id);

    return OrderMapper.toDTO(order, CustomerMapper.toDTO(customer));
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order was succesfully created',
  })
  @ApiResponse({
    status: 404,
    description: 'The customer was not found',
  })
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    const customer = await this.customerService.getById(
      createOrderDTO.customer,
    );

    return await this.orderService.create(
      OrderMapper.createDTOToEntity(createOrderDTO, customer),
      createOrderDTO.orderProducts,
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
  async update(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<Order> {
    const customer = await this.customerService.getById(
      updateOrderDTO.customer,
    );

    const orderDetailsDTO: UpdateOrderDetailDTO[] = updateOrderDTO.orderDetails;
    const orderDetails: OrderDetail[] = await Promise.all(
      orderDetailsDTO.map(async (orderDetail) => {
        const shippedFrom: Location = await this.locationService.getById(
          orderDetail.shippedFrom,
        );
        return OrderDetailMapper.updateDTOToEntity(orderDetail, shippedFrom);
      }),
    );

    return await this.orderService.update(
      id,
      OrderMapper.updateDTOToEntity(updateOrderDTO, customer),
      orderDetails,
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
  async remove(@Param('id') id: string) {
    await this.orderService.remove(id);
  }
}
