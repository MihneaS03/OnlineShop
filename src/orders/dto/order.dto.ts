import { ApiProperty } from '@nestjs/swagger';
import { CustomerDTO } from '../../customers/dto/customer.dto';

export class OrderDTO {
  @ApiProperty({ description: 'The customer that placed the order' })
  customer: CustomerDTO;

  @ApiProperty({ description: 'The date when the order was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The country destination of the order' })
  addressCountry: string;

  @ApiProperty({ description: 'The city destination of the order' })
  addressCity: string;

  @ApiProperty({ description: 'The county destination of the order' })
  addressCounty: string;

  @ApiProperty({ description: 'The street destination of the order' })
  addressStreet: string;

  constructor(
    customer: CustomerDTO,
    createdAt: Date,
    addressCountry: string,
    addressCity: string,
    addressCounty: string,
    addressStreet: string,
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.addressCountry = addressCountry;
    this.addressCity = addressCity;
    this.addressCounty = addressCounty;
    this.addressStreet = addressStreet;
  }
}
