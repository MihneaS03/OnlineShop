import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailRepository } from '../repository/order-detail.repository';
import { OrderDetail } from '../domain/order-detail.domain';
import { StockService } from 'src/products/service/stock.service';
import { Stock } from 'src/products/domain/stock.domain';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly orderDetailRepository: OrderDetailRepository,
    private readonly stockService: StockService,
  ) {}

  getAllOrderDetails(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.getAllOrderDetails();
  }

  async getOrderDetailById(
    orderId: string,
    productId: string,
  ): Promise<OrderDetail | null> {
    const orderDetail: OrderDetail =
      await this.orderDetailRepository.getOrderDetailById(orderId, productId);
    if (!orderDetail) {
      throw new NotFoundException('The order detail was not found');
    }
    return orderDetail;
  }

  async createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
    const stock: Stock = await this.stockService.getStockById(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
    );

    await this.stockService.updateStock(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
      { ...stock, quantity: stock.quantity - orderDetail.quantity },
    );
    return await this.orderDetailRepository.createOrderDetail(orderDetail);
  }

  async updateOrderDetail(
    orderId: string,
    productId: string,
    newOrderDetail: OrderDetail,
  ): Promise<OrderDetail> {
    const currentOrderDetail: OrderDetail =
      await this.orderDetailRepository.getOrderDetailById(orderId, productId);

    const stock: Stock = await this.stockService.getStockById(
      currentOrderDetail.productId,
      currentOrderDetail.shippedFrom.id,
    );

    if (currentOrderDetail.quantity > newOrderDetail.quantity) {
      await this.stockService.updateStock(
        currentOrderDetail.productId,
        currentOrderDetail.shippedFrom.id,
        {
          ...stock,
          quantity:
            stock.quantity +
            (currentOrderDetail.quantity - newOrderDetail.quantity),
        },
      );
    } else if (currentOrderDetail.quantity < newOrderDetail.quantity) {
      await this.stockService.updateStock(
        currentOrderDetail.productId,
        currentOrderDetail.shippedFrom.id,
        {
          ...stock,
          quantity:
            stock.quantity -
            (newOrderDetail.quantity - currentOrderDetail.quantity),
        },
      );
    }

    return await this.orderDetailRepository.updateOrderDetail(
      orderId,
      productId,
      newOrderDetail,
    );
  }

  async removeOrderDetail(orderId: string, productId: string): Promise<void> {
    const orderDetail: OrderDetail =
      await this.orderDetailRepository.getOrderDetailById(orderId, productId);

    const stock: Stock = await this.stockService.getStockById(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
    );

    await this.stockService.updateStock(
      orderDetail.productId,
      orderDetail.shippedFrom.id,
      { ...stock, quantity: stock.quantity + orderDetail.quantity },
    );

    await this.orderDetailRepository.removeOrderDetail(orderId, productId);
  }
}
