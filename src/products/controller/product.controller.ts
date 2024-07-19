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
import { ProductCategoryService } from '../service/productCategory.service';
import { ProductCategory } from '../domain/productCategory.domain';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productMapper: ProductMapper,
  ) {}

  @Get()
  async getAllProducts(): Promise<ProductDTO[]> {
    const allProducts: Product[] = await this.productService.getAllProducts();
    return allProducts.map((product) =>
      this.productMapper.mapProductToProductDTO(product),
    );
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductDTO> {
    const product: Product = await this.productService.getProductById(id);
    return this.productMapper.mapProductToProductDTO(product);
  }

  @Post()
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
  async deleteProduct(@Param('id') id: string) {
    await this.productService.removeProduct(id);
  }
}
