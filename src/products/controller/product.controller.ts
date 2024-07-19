import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductMapper } from '../mapper/product.mapper';
import { Product } from '../domain/product.domain';
import { ProductDTO } from '../dto/product.dto';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductCategoryService } from '../service/product-category.service';
import { ProductCategory } from '../domain/product-category.domain';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productMapper: ProductMapper,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The products were succesfully retrieved',
  })
  async getAllProducts(): Promise<ProductDTO[]> {
    const allProducts: Product[] = await this.productService.getAllProducts();
    return allProducts.map((product) =>
      this.productMapper.mapProductToProductDTO(product),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The product was succesfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The product was not found',
  })
  async getProductById(@Param('id') id: string): Promise<ProductDTO> {
    const product: Product = await this.productService.getProductById(id);
    return this.productMapper.mapProductToProductDTO(product);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product was succesfully created',
  })
  async createProduct(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getProductCategoryById(
        createProductDTO.category,
      );
    return await this.productService.createProduct(
      this.productMapper.mapCreateProductDTOToProduct(
        createProductDTO,
        productCategory,
      ),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The product was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The product was not found',
  })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getProductCategoryById(
        updateProductDTO.category,
      );
    return await this.productService.updateProduct(
      id,
      this.productMapper.mapUpdateProductDTOToProduct(
        updateProductDTO,
        productCategory,
      ),
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The product was succesfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The product was not found',
  })
  async deleteProduct(@Param('id') id: string) {
    await this.productService.removeProduct(id);
  }
}
