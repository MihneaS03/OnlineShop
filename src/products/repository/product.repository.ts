import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/product.domain';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async createProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async updateProduct(id: string, newProduct: Product): Promise<Product> {
    newProduct.id = id;
    return await this.productRepository.save(newProduct);
  }

  async removeProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
