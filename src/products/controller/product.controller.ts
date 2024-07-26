import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductMapper } from '../mapper/product.mapper';
import { Product } from '../domain/product.domain';
import { ProductDTO } from '../dto/product.dto';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductCategoryService } from '../service/product-category.service';
import { ProductCategory } from '../domain/product-category.domain';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCategoryMapper } from '../mapper/product-category.mapper';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/role-auth.guard';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The products were succesfully retrieved',
  })
  async getAll(): Promise<ProductDTO[]> {
    const allProducts: Product[] = await this.productService.getAll();
    return allProducts.map((product) =>
      ProductMapper.toDTO(
        product,
        ProductCategoryMapper.toDTO(product.category),
      ),
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
  async getById(@Param('id') id: string): Promise<ProductDTO> {
    const product: Product = await this.productService.getById(id);
    return ProductMapper.toDTO(
      product,
      ProductCategoryMapper.toDTO(product.category),
    );
  }

  @Post()
  @Roles(['admin'])
  @ApiResponse({
    status: 201,
    description: 'The product was succesfully created',
  })
  async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getById(createProductDTO.category);
    return await this.productService.create(
      ProductMapper.createDTOToEntity(createProductDTO, productCategory),
    );
  }

  @Put(':id')
  @Roles(['admin'])
  @ApiResponse({
    status: 200,
    description: 'The product was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The product was not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoryService.getById(updateProductDTO.category);
    return await this.productService.update(
      id,
      ProductMapper.updateDTOToEntity(updateProductDTO, productCategory),
    );
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiResponse({
    status: 200,
    description: 'The product was succesfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The product was not found',
  })
  async delete(@Param('id') id: string) {
    await this.productService.remove(id);
  }
}
