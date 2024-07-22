import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { StockMapper } from '../mapper/stock.mapper';
import { StockDTO } from '../dto/stock.dto';
import { Stock } from '../domain/stock.domain';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductMapper } from '../mapper/product.mapper';
import { LocationMapper } from '../mapper/location.mapper';
import { ProductService } from '../service/product.service';
import { LocationService } from '../service/location.service';
import { Location } from '../domain/location.domain';
import { Product } from '../domain/product.domain';
import { ProductCategoryMapper } from '../mapper/product-category.mapper';
import { ProductCategoryService } from '../service/product-category.service';
import { ProductCategory } from '../domain/product-category.domain';
import { UpdateStockDTO } from '../dto/update-stock.dto';

@ApiTags('stocks')
@Controller('stocks')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The stocks were succesfully retrieved',
  })
  async getAll(): Promise<StockDTO[]> {
    const allStocks: Stock[] = await this.stockService.getAll();

    return await Promise.all(
      allStocks.map(async (stock) => {
        const product: Product = await this.productService.getById(
          stock.productId,
        );
        const productCategory: ProductCategory =
          await this.productCategoryService.getById(product.category.id);
        const location: Location = await this.locationService.getById(
          stock.locationId,
        );
        return StockMapper.toDTO(
          stock,
          ProductMapper.toDTO(
            product,
            ProductCategoryMapper.toDTO(productCategory),
          ),
          LocationMapper.toDTO(location),
        );
      }),
    );
  }

  @Put(':productId/:locationId')
  @ApiResponse({
    status: 200,
    description: 'The stock was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The stock was not found',
  })
  async update(
    @Param('productId') productId: string,
    @Param('locationId') locationId: string,
    @Body() updateStockDTO: UpdateStockDTO,
  ): Promise<Stock> {
    return await this.stockService.update(
      productId,
      locationId,
      StockMapper.updateDTOToEntity(updateStockDTO),
    );
  }
}
