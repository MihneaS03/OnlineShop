import { Injectable, NotFoundException } from '@nestjs/common';
import { Stock } from '../domain/stock.domain';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  getAllStocks(): Promise<Stock[]> {
    return this.stockRepository.getAllStocks();
  }

  async getOrderById(
    productId: string,
    locationId: string,
  ): Promise<Stock | null> {
    const stock: Stock = await this.stockRepository.getStockById(
      productId,
      locationId,
    );
    if (!stock) {
      throw new NotFoundException('The stock was not found');
    }
    return stock;
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
