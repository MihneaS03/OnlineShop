import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { Order } from '../domain/order.domain';
import { OrderDetail } from '../domain/order-detail.domain';
import { Stock } from 'src/products/domain/stock.domain';
import { StockService } from 'src/products/service/stock.service';
import { OrderDetailService } from './order-detail.service';
import { OrderProduct } from '../dto/create-order.dto';
import { Location } from 'src/products/domain/location.domain';
import { LocationService } from 'src/products/service/location.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailService: OrderDetailService,
    private readonly stockService: StockService,
    private readonly locationService: LocationService,
  ) {}

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAllOrders();
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order: Order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new NotFoundException('The order was not found');
    }
    return order;
  }

  async createOrder(
    order: Order,
    orderProducts: OrderProduct[],
  ): Promise<Order> {
    order.createdAt = new Date();

    for (const orderProduct of orderProducts) {
      const stock: Stock = await this.stockService.getStockById(
        orderProduct.productId,
        orderProduct.shippedFrom,
      );

      if (!stock || stock.quantity < orderProduct.quantity) {
        throw new BadRequestException(
          `Insufficient stock for the product ${orderProduct.productId}`,
        );
      }
    }

    const createdOrder: Order = await this.orderRepository.createOrder(order);

    for (const orderProduct of orderProducts) {
      const location: Location = await this.locationService.getLocationById(
        orderProduct.shippedFrom,
      );

      const orderDetail: OrderDetail = new OrderDetail(
        createdOrder.id,
        orderProduct.productId,
        location,
        orderProduct.quantity,
      );
      await this.orderDetailService.createOrderDetail(orderDetail);
    }

    return createdOrder;
  }

  async updateOrder(
    id: string,
    newOrder: Order,
    orderDetails: OrderDetail[],
  ): Promise<Order> {
    for (const orderDetail of orderDetails) {
      const stock: Stock = await this.stockService.getStockById(
        orderDetail.productId,
        orderDetail.shippedFrom.id,
      );

      if (!stock || stock.quantity < orderDetail.quantity) {
        throw new BadRequestException(
          `Insufficient stock for the product ${orderDetail.productId}`,
        );
      }
    }

    for (const orderDetail of orderDetails) {
      await this.orderDetailService.updateOrderDetail(
        orderDetail.orderId,
        orderDetail.productId,
        orderDetail,
      );
    }

    return await this.orderRepository.updateOrder(id, newOrder);
  }

  async removeOrder(id: string): Promise<void> {
    await this.orderRepository.removeOrder(id);
  }
}
