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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('product-categories')
@Controller('product-categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The categories were succesfully retrieved',
  })
  async getAll(): Promise<ProductCategoryDTO[]> {
    const allProductCategories: ProductCategory[] =
      await this.productCategoryService.getAll();
    return allProductCategories.map((productCategory) =>
      ProductCategoryMapper.toDTO(productCategory),
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
  async getById(@Param('id') id: string): Promise<ProductCategoryDTO> {
    const productCategory = await this.productCategoryService.getById(id);
    return ProductCategoryMapper.toDTO(productCategory);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The category was succesfully created',
  })
  async create(
    @Body() createProductCategoryDTO: CreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    return await this.productCategoryService.create(
      ProductCategoryMapper.createDTOToEntity(createProductCategoryDTO),
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
  async update(
    @Param('id') id: string,
    @Body() updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): Promise<ProductCategory> {
    return await this.productCategoryService.update(
      id,
      ProductCategoryMapper.updateDTOToEntity(updateProductCategoryDTO),
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
  async remove(@Param('id') id: string): Promise<void> {
    await this.productCategoryService.remove(id);
  }
}
