import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailRepository } from '../repository/order-detail.repository';
import { OrderDetail } from '../domain/order-detail.domain';
import { StockService } from '../../products/service/stock.service';
import { Stock } from '../../products/domain/stock.domain';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly orderDetailRepository: OrderDetailRepository,
    private readonly stockService: StockService,
  ) {}

  async getAll(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.getAll();
  }

  async getAllOfOrder(orderId: string): Promise<OrderDetail[]> {
    return this.orderDetailRepository.getAllOfOrder(orderId);
  }

  async getById(
    orderId: string,
    productId: string,
  ): Promise<OrderDetail | null> {
    const orderDetail: OrderDetail = await this.orderDetailRepository.getById(
      orderId,
      productId,
    );
    if (!orderDetail) {
      throw new NotFoundException('The order detail was not found');
    }
    return orderDetail;
  }

  async create(orderDetail: OrderDetail): Promise<OrderDetail> {
    const stock: Stock = await this.stockService.getById(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
    );

    await this.stockService.update(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
      { ...stock, quantity: stock.quantity - orderDetail.quantity },
    );
    return await this.orderDetailRepository.create(orderDetail);
  }

  async update(
    orderId: string,
    productId: string,
    newOrderDetail: OrderDetail,
  ): Promise<OrderDetail> {
    const currentOrderDetail: OrderDetail =
      await this.orderDetailRepository.getById(orderId, productId);

    const stock: Stock = await this.stockService.getById(
      currentOrderDetail.productId,
      currentOrderDetail.shippedFrom.id,
    );

    const quantityDifference: number =
      newOrderDetail.quantity - currentOrderDetail.quantity;

    if (quantityDifference !== 0) {
      await this.stockService.update(
        currentOrderDetail.productId,
        currentOrderDetail.shippedFrom.id,
        {
          ...stock,
          quantity: stock.quantity - quantityDifference,
        },
      );
    }

    return await this.orderDetailRepository.update(
      orderId,
      productId,
      newOrderDetail,
    );
  }

  async remove(orderId: string, productId: string): Promise<void> {
    const orderDetail: OrderDetail = await this.orderDetailRepository.getById(
      orderId,
      productId,
    );

    const stock: Stock = await this.stockService.getById(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
    );

    await this.stockService.update(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
      { ...stock, quantity: stock.quantity + orderDetail.quantity },
    );

    await this.orderDetailRepository.remove(orderId, productId);
  }
}
