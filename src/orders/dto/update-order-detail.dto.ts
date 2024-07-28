import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDetailDTO {
  @ApiProperty({
    description: 'The id of the order associated with the order detail',
  })
  @IsNotEmpty()
  @IsUUID()
  order: string;

  @ApiProperty({
    description: 'The id of the product associated with the order detail',
  })
  @IsNotEmpty()
  @IsUUID()
  product: string;

  @ApiProperty({
    description: 'The id of the location where the order was shipped from',
  })
  @IsNotEmpty()
  @IsUUID()
  shippedFrom: string;

  @ApiProperty({ description: 'The quantity of products ordered' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
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
