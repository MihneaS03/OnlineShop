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

  async getAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find();
  }

  async getById(id: string): Promise<ProductCategory | null> {
    return this.productCategoryRepository.findOneBy({ id });
  }

  async create(productCategory: ProductCategory): Promise<ProductCategory> {
    return await this.productCategoryRepository.save(productCategory);
  }

  async update(
    id: string,
    newProductCategory: ProductCategory,
  ): Promise<ProductCategory> {
    newProductCategory.id = id;
    return await this.productCategoryRepository.save(newProductCategory);
  }

  async remove(id: string): Promise<void> {
    await this.productCategoryRepository.delete(id);
  }
}
