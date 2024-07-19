import { Injectable } from '@nestjs/common';
import { StockDTO } from '../dto/stock.dto';
import { Stock } from '../domain/stock.domain';
import { CreateStockDTO } from '../dto/create-stock.dto';
import { UpdateStockDTO } from '../dto/update-stock.dto';

@Injectable()
export class StockMapper {
  mapStockToStockDTO(stock: Stock): StockDTO {
    return new StockDTO(stock.product.id, stock.location.id, stock.quantity);
  }

  mapStockDTOToStock(stockDTO: StockDTO): Stock {
    return new Stock(stockDTO.product, stockDTO.location, stockDTO.quantity);
  }

  mapStockToCreateStockDTO(stock: Stock): CreateStockDTO {
    return new CreateStockDTO(
      stock.product.id,
      stock.location.id,
      stock.quantity,
    );
  }

  mapCreateStockDTOToStock(createStockDTO: CreateStockDTO): Stock {
    return new Stock(
      createStockDTO.product,
      createStockDTO.location,
      createStockDTO.quantity,
    );
  }

  mapStockToUpdateStockDTO(stock: Stock): UpdateStockDTO {
    return new UpdateStockDTO(
      stock.product.id,
      stock.location.id,
      stock.quantity,
    );
  }

  mapUpdateStockDTOToStock(updateStockDTO: UpdateStockDTO): Stock {
    return new Stock(
      updateStockDTO.product,
      updateStockDTO.location,
      updateStockDTO.quantity,
    );
  }
}
