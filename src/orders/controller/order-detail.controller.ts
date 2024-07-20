import { Controller } from '@nestjs/common';
import { ProductService } from 'src/products/service/product.service';
import { OrderDetailMapper } from '../mapper/order-detail.mapper';
import { OrderDetailService } from '../service/order-detail.service';

@Controller('order-details')
export class OrderDetailController {
  private readonly orderDetailMapper: OrderDetailMapper;

  constructor(
    private readonly orderDetailService: OrderDetailService,
    private readonly productService: ProductService,
  ) {
    this.orderDetailMapper = new OrderDetailMapper();
  }
}
