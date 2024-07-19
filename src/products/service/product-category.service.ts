import { Injectable } from '@nestjs/common';
import { ProductCategoryRepository } from '../repository/product-category.repository';
import { ProductCategory } from '../domain/product-category.domain';

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  getAllProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.getAllProductCategories();
  }

  getProductCategoryById(id: string): Promise<ProductCategory | null> {
    return this.productCategoryRepository.getProductCategoryById(id);
  }

  async createProductCategory(
    productCategory: ProductCategory,
  ): Promise<ProductCategory> {
    return await this.productCategoryRepository.createProductCategory(
      productCategory,
    );
  }

  async updateProductCategory(
    id: string,
    newProductCategory: ProductCategory,
  ): Promise<ProductCategory> {
    return await this.productCategoryRepository.updateProductCategory(
      id,
      newProductCategory,
    );
  }

  async removeProductCategory(id: string): Promise<void> {
    return await this.productCategoryRepository.removeProductCategory(id);
  }
}
