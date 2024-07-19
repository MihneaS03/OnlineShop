import { Controller } from '@nestjs/common';
import { ProductService } from 'src/products/service/product.service';
import { OrderService } from '../service/order.service';
import { OrderDetailMapper } from '../mapper/order-detail.mapper';

@Controller('order-details')
export class OrderDetailController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly orderMapper: OrderDetailMapper,
  ) {}
}
