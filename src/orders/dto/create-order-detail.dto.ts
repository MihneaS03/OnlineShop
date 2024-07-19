export class CreateOrderDetailDTO {
  order: string;
  product: string;
  shippedFrom: string;
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
