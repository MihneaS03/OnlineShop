import { ProductDTO } from 'src/products/dto/product.dto';
import { OrderDTO } from './order.dto';
import { LocationDTO } from 'src/products/dto/location.dto';

export class OrderDetailDTO {
  order: OrderDTO;
  product: ProductDTO;
  shippedFrom: LocationDTO;
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
