export class UpdateProductDTO {
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: string;
  imageUrl: string;
  category: string;

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    supplier: string,
    imageUrl: string,
    category: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
    this.category = category;
  }
}
