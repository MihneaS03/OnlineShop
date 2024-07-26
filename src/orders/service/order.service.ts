import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { Order } from '../domain/order.domain';
import { OrderDetail } from '../domain/order-detail.domain';
import { Stock } from '../../products/domain/stock.domain';
import { StockService } from '../../products/service/stock.service';
import { OrderDetailService } from './order-detail.service';
import { OrderProduct } from '../dto/create-order.dto';
import { Location } from '../../products/domain/location.domain';
import { LocationService } from '../../products/service/location.service';
import { CustomerService } from '../../customers/service/customer.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailService: OrderDetailService,
    private readonly stockService: StockService,
    private readonly locationService: LocationService,
    private readonly customerService: CustomerService,
  ) {}

  async getAll(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }

  async getById(id: string): Promise<Order | null> {
    const order: Order = await this.orderRepository.getById(id);
    if (!order) {
      throw new NotFoundException('The order was not found');
    }
    return order;
  }

  @Transactional()
  async create(order: Order, orderProducts: OrderProduct[]): Promise<Order> {
    order.createdAt = new Date();
    const customer = await this.customerService.getById(order.customer.id);

    if (!customer) {
      throw new BadRequestException(
        'The customer added to the order does not exist',
      );
    }

    if (!orderProducts || orderProducts.length == 0) {
      throw new BadRequestException('The basket cannot be empty');
    }

    await Promise.all(
      orderProducts.map(async (orderProduct) => {
        const stock: Stock = await this.stockService.getById(
          orderProduct.product,
          orderProduct.shippedFrom,
        );

        if (!stock || stock.quantity < orderProduct.quantity) {
          throw new BadRequestException(
            `Insufficient stock for the product ${orderProduct.product}`,
          );
        }
      }),
    );

    const createdOrder: Order = await this.orderRepository.create(order);

    await Promise.all(
      orderProducts.map(async (orderProduct) => {
        const location: Location = await this.locationService.getById(
          orderProduct.shippedFrom,
        );

        const orderDetail: OrderDetail = new OrderDetail(
          createdOrder.id,
          orderProduct.product,
          location,
          orderProduct.quantity,
        );
        await this.orderDetailService.create(orderDetail);
      }),
    );

    return createdOrder;
  }

  @Transactional()
  async update(
    id: string,
    newOrder: Order,
    orderDetails: OrderDetail[],
  ): Promise<Order> {
    if (!(await this.orderRepository.getById(id))) {
      throw new NotFoundException('The order was not found');
    }

    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        const stock: Stock = await this.stockService.getById(
          orderDetail.productId,
          orderDetail.shippedFrom.id,
        );

        if (!stock || stock.quantity < orderDetail.quantity) {
          throw new BadRequestException(
            `Insufficient stock for the product ${orderDetail.productId}`,
          );
        }
      }),
    );

    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        await this.orderDetailService.update(
          orderDetail.orderId,
          orderDetail.productId,
          orderDetail,
        );
      }),
    );

    return await this.orderRepository.update(id, newOrder);
  }

  @Transactional()
  async remove(id: string): Promise<void> {
    const allOrderDetails: OrderDetail[] =
      await this.orderDetailService.getAllOfOrder(id);

    await Promise.all(
      allOrderDetails.map(async (orderDetail) => {
        await this.orderDetailService.remove(
          orderDetail.orderId,
          orderDetail.productId,
        );
      }),
    );
    await this.orderRepository.remove(id);
  }
}
