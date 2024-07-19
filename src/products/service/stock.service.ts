import { Injectable } from '@nestjs/common';
import { Stock } from '../domain/stock.domain';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  getAllStocks(): Promise<Stock[]> {
    return this.stockRepository.getAllStocks();
  }

  getOrderById(productId: string, locationId: string): Promise<Stock | null> {
    return this.stockRepository.getStockById(productId, locationId);
  }

  async createStock(stock: Stock): Promise<Stock> {
    return await this.stockRepository.createStock(stock);
  }

  async updateStock(
    productId: string,
    locationId: string,
    newStock: Stock,
  ): Promise<Stock> {
    return await this.stockRepository.updateStock(
      productId,
      locationId,
      newStock,
    );
  }

  async removeStock(productId: string, locationId: string): Promise<void> {
    await this.stockRepository.removeStock(productId, locationId);
  }
}
