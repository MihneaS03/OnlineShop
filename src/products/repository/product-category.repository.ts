import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../domain/product-category.domain';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  getAllProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find();
  }

  getProductCategoryById(id: string): Promise<ProductCategory | null> {
    return this.productCategoryRepository.findOneBy({ id });
  }

  async createProductCategory(
    productCategory: ProductCategory,
  ): Promise<ProductCategory> {
    return await this.productCategoryRepository.save(productCategory);
  }

  async updateProductCategory(
    id: string,
    newProductCategory: ProductCategory,
  ): Promise<ProductCategory> {
    newProductCategory.id = id;
    return await this.productCategoryRepository.save(newProductCategory);
  }

  async removeProductCategory(id: string): Promise<void> {
    await this.productCategoryRepository.delete(id);
  }
}
