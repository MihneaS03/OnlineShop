import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoryRepository } from '../repository/product-category.repository';
import { ProductCategory } from '../domain/product-category.domain';

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async getAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.getAll();
  }

  async getById(id: string): Promise<ProductCategory | null> {
    const productCategory: ProductCategory =
      await this.productCategoryRepository.getById(id);
    if (!productCategory) {
      throw new NotFoundException('The product category was not found');
    }
    return productCategory;
  }

  async create(productCategory: ProductCategory): Promise<ProductCategory> {
    return await this.productCategoryRepository.create(productCategory);
  }

  async update(
    id: string,
    newProductCategory: ProductCategory,
  ): Promise<ProductCategory> {
    return await this.productCategoryRepository.update(id, newProductCategory);
  }

  async remove(id: string): Promise<void> {
    return await this.productCategoryRepository.remove(id);
  }
}
