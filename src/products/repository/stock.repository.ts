import { Injectable } from '@nestjs/common';
import { Stock } from '../domain/stock.domain';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockRepository {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  getAllStocks(): Promise<Stock[]> {
    return this.stockRepository.find();
  }

  getStockById(productId: string, locationId: string): Promise<Stock | null> {
    return this.stockRepository.findOne({
      where: { productId, locationId },
    });
  }

  async createStock(stock: Stock): Promise<Stock> {
    return await this.stockRepository.save(stock);
  }

  async updateStock(
    productId: string,
    locationId: string,
    newStock: Stock,
  ): Promise<Stock> {
    newStock.productId = productId;
    newStock.locationId = locationId;
    return await this.stockRepository.save(newStock);
  }

  async removeStock(productId: string, locationId: string): Promise<void> {
    await this.stockRepository.delete({ productId, locationId });
  }
}
