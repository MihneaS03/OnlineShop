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
import { ApiResponse } from '@nestjs/swagger';

@Controller('product-categories')
export class ProductCategoryController {
  private readonly productCategoryMapper: ProductCategoryMapper;

  constructor(private readonly productCategoryService: ProductCategoryService) {
    this.productCategoryMapper = new ProductCategoryMapper();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The categories were succesfully retrieved',
  })
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
  @ApiResponse({
    status: 200,
    description: 'The category was succesfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The category was not found',
  })
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
  @ApiResponse({
    status: 201,
    description: 'The category was succesfully created',
  })
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
  @ApiResponse({
    status: 200,
    description: 'The category was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The category was not found',
  })
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
  @ApiResponse({
    status: 200,
    description: 'The category was succesfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The category was not found',
  })
  async removeProductCategory(@Param('id') id: string): Promise<void> {
    await this.productCategoryService.removeProductCategory(id);
  }
}
