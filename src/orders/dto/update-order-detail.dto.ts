import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDetailDTO {
  @ApiProperty({
    description: 'The id of the order associated with the order detail',
  })
  @IsNotEmpty()
  order: string;

  @ApiProperty({
    description: 'The id of the product associated with the order detail',
  })
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    description: 'The id of the location where the order was shipped from',
  })
  @IsNotEmpty()
  shippedFrom: string;

  @ApiProperty({ description: 'The quantity of products ordered' })
  @IsNotEmpty()
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
