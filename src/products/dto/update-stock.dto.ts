export class UpdateStockDTO {
  product: string;
  location: string;
  quantity: number;

  constructor(product: string, location: string, quantity: number) {
    this.product = product;
    this.location = location;
    this.quantity = quantity;
  }
}
