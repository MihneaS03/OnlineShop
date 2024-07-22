import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class OrderProduct {
  productId: string;
  shippedFrom: string;
  quantity: number;

  constructor(productId: string, locationId: string, quantity: number) {
    this.productId = productId;
    this.shippedFrom = locationId;
    this.quantity = quantity;
  }
}

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

  @ApiProperty({
    description: 'The order details associated to the order',
    type: 'array',
    items: { $ref: getSchemaPath(OrderProduct) },
  })
  orderProducts: OrderProduct[];

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
