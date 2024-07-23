import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';
import { LocationDTO } from './location.dto';

export class StockDTO {
  @ApiProperty({
    description: 'The product to which the stock belongs',
  })
  product: ProductDTO;

  @ApiProperty({
    description: 'The location to which the stock belongs',
  })
  location: LocationDTO;

  @ApiProperty({ description: 'The quantity in the stock' })
  quantity: number;

  constructor(product: ProductDTO, location: LocationDTO, quantity: number) {
    this.product = product;
    this.location = location;
    this.quantity = quantity;
  }
}
