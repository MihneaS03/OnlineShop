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

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async getProductById(id: string): Promise<Product | null> {
    const product: Product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException('The product was not found');
    }
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getProductCategoryById(
        product.category.id,
      );
    if (!productCategory) {
      throw new BadRequestException(
        'The product category selected for this product does not exist',
      );
    }

    return await this.productRepository.createProduct(product);
  }

  async updateProduct(id: string, newProduct: Product): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getProductCategoryById(
        newProduct.category.id,
      );
    if (!productCategory) {
      throw new BadRequestException(
        'The product category selected for this product does not exist',
      );
    }

    return await this.productRepository.updateProduct(id, newProduct);
  }

  async removeProduct(id: string): Promise<void> {
    await this.productRepository.removeProduct(id);
  }
}
