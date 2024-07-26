import { ProductDTO } from '../../products/dto/product.dto';
import { OrderDTO } from './order.dto';
import { LocationDTO } from '../../products/dto/location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailDTO {
  @ApiProperty({ description: 'The order associated with the order detail' })
  order: OrderDTO;

  @ApiProperty({ description: 'The product associated with the order detail' })
  product: ProductDTO;

  @ApiProperty({ description: 'The location where the order was shipped from' })
  shippedFrom: LocationDTO;

  @ApiProperty({ description: 'The quantity of products ordered' })
  quantity: number;

  constructor(
    order: OrderDTO,
    product: ProductDTO,
    shippedFrom: LocationDTO,
    quantity: number,
  ) {
    this.order = order;
    this.product = product;
    this.shippedFrom = shippedFrom;
    this.quantity = quantity;
  }
}
