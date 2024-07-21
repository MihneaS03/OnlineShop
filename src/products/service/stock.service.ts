import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Stock } from '../domain/stock.domain';
import { StockRepository } from '../repository/stock.repository';
import { Product } from '../domain/product.domain';
import { Location } from '../domain/location.domain';
import { ProductService } from './product.service';
import { LocationService } from './location.service';

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly productService: ProductService,
    private readonly locationService: LocationService,
  ) {}

  getAllStocks(): Promise<Stock[]> {
    return this.stockRepository.getAllStocks();
  }

  async getStockById(
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
    const product: Product = await this.productService.getProductById(
      stock.productId,
    );
    const location: Location = await this.locationService.getLocationById(
      stock.locationId,
    );

    if (!product) {
      throw new BadRequestException(
        'The product selected for this stock does not exist',
      );
    }

    if (!location) {
      throw new BadRequestException(
        'The location selected for this stock does not exist',
      );
    }

    return await this.stockRepository.createStock(stock);
  }

  async updateStock(
    productId: string,
    locationId: string,
    newStock: Stock,
  ): Promise<Stock> {
    const product: Product = await this.productService.getProductById(
      newStock.productId,
    );
    const location: Location = await this.locationService.getLocationById(
      newStock.locationId,
    );

    if (!product) {
      throw new BadRequestException(
        'The product selected for this stock does not exist',
      );
    }

    if (!location) {
      throw new BadRequestException(
        'The location selected for this stock does not exist',
      );
    }

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
