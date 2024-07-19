import { ApiProperty } from '@nestjs/swagger';

export class StockDTO {
  @ApiProperty({
    description: 'The id of the product to which the stock belongs',
  })
  product: string;

  @ApiProperty({
    description: 'The id of the location to which the stock belongs',
  })
  location: string;

  @ApiProperty({ description: 'The quantity in the stock' })
  quantity: number;

  constructor(product: string, location: string, quantity: number) {
    this.product = product;
    this.location = location;
    this.quantity = quantity;
  }
}
