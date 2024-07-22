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

  async getAll(): Promise<Stock[]> {
    return this.stockRepository.getAll();
  }

  async getById(productId: string, locationId: string): Promise<Stock | null> {
    const stock: Stock = await this.stockRepository.getById(
      productId,
      locationId,
    );
    if (!stock) {
      throw new NotFoundException('The stock was not found');
    }
    return stock;
  }

  async create(stock: Stock): Promise<Stock> {
    const product: Product = await this.productService.getById(stock.productId);
    const location: Location = await this.locationService.getById(
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

    return await this.stockRepository.create(stock);
  }

  async update(
    productId: string,
    locationId: string,
    newStock: Stock,
  ): Promise<Stock> {
    const product: Product = await this.productService.getById(
      newStock.productId,
    );
    const location: Location = await this.locationService.getById(
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

    return await this.stockRepository.update(productId, locationId, newStock);
  }

  async remove(productId: string, locationId: string): Promise<void> {
    await this.stockRepository.remove(productId, locationId);
  }
}
