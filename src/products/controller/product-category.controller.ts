import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCategoryService } from '../service/product-category.service';
import { ProductCategoryDTO } from '../dto/product-category.dto';
import { ProductCategoryMapper } from '../mapper/product-category.mapper';
import { ProductCategory } from '../domain/product-category.domain';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from '../dto/update-product-category.dto';

@Controller('product-categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
    private readonly productCategoryMapper: ProductCategoryMapper,
  ) {}

  @Get()
  async getAllProductCategories(): Promise<ProductCategoryDTO[]> {
    const allProductCategories: ProductCategory[] =
      await this.productCategoryService.getAllProductCategories();
    return allProductCategories.map((productCategory) =>
      this.productCategoryMapper.mapProductCategoryToProductCategoryDTO(
        productCategory,
      ),
    );
  }

  @Get(':id')
  async getProductCategoryById(
    @Param('id') id: string,
  ): Promise<ProductCategoryDTO> {
    const productCategory =
      await this.productCategoryService.getProductCategoryById(id);
    return this.productCategoryMapper.mapProductCategoryToProductCategoryDTO(
      productCategory,
    );
  }

  @Post()
  async createProductCategory(
    @Body() createProductCategoryDTO: CreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    return await this.productCategoryService.createProductCategory(
      this.productCategoryMapper.mapCreateProductCategoryDTOToProductCategory(
        createProductCategoryDTO,
      ),
    );
  }

  @Put(':id')
  async updateProductCategory(
    @Param('id') id: string,
    @Body() updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): Promise<ProductCategory> {
    return await this.productCategoryService.updateProductCategory(
      id,
      this.productCategoryMapper.mapUpdateProductCategoryDTOToProductCategory(
        updateProductCategoryDTO,
      ),
    );
  }

  @Delete(':id')
  async removeProductCategory(@Param('id') id: string): Promise<void> {
    await this.productCategoryService.removeProductCategory(id);
  }
}
