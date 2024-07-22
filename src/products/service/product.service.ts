import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../domain/product.domain';
import { ProductCategory } from '../domain/product-category.domain';
import { ProductCategoryService } from './product-category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getById(id: string): Promise<Product | null> {
    const product: Product = await this.productRepository.getById(id);
    if (!product) {
      throw new NotFoundException('The product was not found');
    }
    return product;
  }

  async create(product: Product): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getById(product.category.id);
    if (!productCategory) {
      throw new BadRequestException(
        'The product category selected for this product does not exist',
      );
    }

    return await this.productRepository.create(product);
  }

  async update(id: string, newProduct: Product): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getById(newProduct.category.id);
    if (!productCategory) {
      throw new BadRequestException(
        'The product category selected for this product does not exist',
      );
    }

    return await this.productRepository.update(id, newProduct);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.remove(id);
  }
}
