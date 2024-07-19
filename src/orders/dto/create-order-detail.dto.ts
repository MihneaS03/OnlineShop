import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDTO {
  @ApiProperty({
    description: 'The id of the order associated with the order detail',
  })
  order: string;

  @ApiProperty({
    description: 'The id of the product associated with the order detail',
  })
  product: string;

  @ApiProperty({
    description: 'The id of the location where the order was shipped from',
  })
  shippedFrom: string;

  @ApiProperty({ description: 'The quantity of products ordered' })
  quantity: number;

  constructor(
    order: string,
    product: string,
    shippedFrom: string,
    quantity: number,
  ) {
    this.order = order;
    this.product = product;
    this.shippedFrom = shippedFrom;
    this.quantity = quantity;
  }
}
