import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({ description: 'The id of the customer that placed the order' })
  customer: string;

  @ApiProperty({ description: 'The country destination of the order' })
  addressCountry: string;

  @ApiProperty({ description: 'The city destination of the order' })
  addressCity: string;

  @ApiProperty({ description: 'The county destination of the order' })
  addressCounty: string;

  @ApiProperty({ description: 'The street destination of the order' })
  addressStreet: string;

  constructor(
    customer: string,
    addressCountry: string,
    addressCity: string,
    addressCounty: string,
    addressStreet: string,
  ) {
    this.customer = customer;
    this.addressCountry = addressCountry;
    this.addressCity = addressCity;
    this.addressCounty = addressCounty;
    this.addressStreet = addressStreet;
  }
}
