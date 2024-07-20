import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { StockMapper } from '../mapper/stock.mapper';
import { StockDTO } from '../dto/stock.dto';
import { Stock } from '../domain/stock.domain';
import { ApiResponse } from '@nestjs/swagger';
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

@Controller('stocks')
export class StockController {
  private readonly stockMapper: StockMapper;
  private readonly productMapper: ProductMapper;
  private readonly productCategoryMapper: ProductCategoryMapper;
  private readonly locationMapper: LocationMapper;

  constructor(
    private readonly stockService: StockService,
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly locationService: LocationService,
  ) {
    this.stockMapper = new StockMapper();
    this.productMapper = new ProductMapper();
    this.productCategoryMapper = new ProductCategoryMapper();
    this.locationMapper = new LocationMapper();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The stocks were succesfully retrieved',
  })
  async getAllStocks(): Promise<StockDTO[]> {
    const allStocks: Stock[] = await this.stockService.getAllStocks();
    const allStocksDTO: StockDTO[] = [];

    for (const stock of allStocks) {
      const product: Product = await this.productService.getProductById(
        stock.productId,
      );
      const productCategory: ProductCategory =
        await this.productCategoryService.getProductCategoryById(
          product.category.id,
        );
      const location: Location = await this.locationService.getLocationById(
        stock.locationId,
      );

      allStocksDTO.push(
        this.stockMapper.mapStockToStockDTO(
          stock,
          this.productMapper.mapProductToProductDTO(
            product,
            this.productCategoryMapper.mapProductCategoryToProductCategoryDTO(
              productCategory,
            ),
          ),
          this.locationMapper.mapLocationToLocationDTO(location),
        ),
      );
    }

    return allStocksDTO;
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
  async updateStock(
    @Param('productId') productId: string,
    @Param('locationId') locationId: string,
    @Body() updateStockDTO: UpdateStockDTO,
  ): Promise<Stock> {
    return await this.stockService.updateStock(
      productId,
      locationId,
      this.stockMapper.mapUpdateStockDTOToStock(updateStockDTO),
    );
  }
}
