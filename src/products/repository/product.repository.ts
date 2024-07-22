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

  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getById(id: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(id: string, newProduct: Product): Promise<Product> {
    newProduct.id = id;
    return await this.productRepository.save(newProduct);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
