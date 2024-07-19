import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { StockMapper } from '../mapper/stock.mapper';
import { StockDTO } from '../dto/stock.dto';
import { Stock } from '../domain/stock.domain';

@Controller('stocks')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly stockMapper: StockMapper,
  ) {}

  @Get()
  async getAllStocks(): Promise<StockDTO[]> {
    const allStocks: Stock[] = await this.stockService.getAllStocks();
    return allStocks.map((stock) => this.stockMapper.mapStockToStockDTO(stock));
  }

  @Put(':productId/:locationId')
  async updateStock(
    @Param('productId') productId: string,
    @Param('locationId') locationId: string,
    @Body() newStock: Stock,
  ): Promise<Stock> {
    return await this.stockService.updateStock(productId, locationId, newStock);
  }
}
