import { Injectable } from '@nestjs/common';
import { ProductCategoryDTO } from '../dto/productCategory.dto';
import { ProductCategory } from '../domain/productCategory.domain';
import { CreateProductCategoryDTO } from '../dto/create-productCategory.dto';
import { UpdateProductCategoryDTO } from '../dto/update-productCategory.dto';

@Injectable()
export class ProductCategoryMapper {
  mapProductCategoryToProductCategoryDTO(
    productCategory: ProductCategory,
  ): ProductCategoryDTO {
    return new ProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  mapProductCategoryDTOToProductCategory(
    productCategoryDTO: ProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      productCategoryDTO.name,
      productCategoryDTO.description,
    );
  }

  mapProductCategoryToCreateProductCategoryDTO(
    productCategory: ProductCategory,
  ): CreateProductCategoryDTO {
    return new CreateProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  mapCreateProductCategoryDTOToProductCategory(
    createProductCategoryDTO: CreateProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      createProductCategoryDTO.name,
      createProductCategoryDTO.description,
    );
  }

  mapProductCategoryToUpdateProductCategoryDTO(
    productCategory: ProductCategory,
  ): UpdateProductCategoryDTO {
    return new UpdateProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  mapUpdateProductCategoryDTOToProductCategory(
    updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      updateProductCategoryDTO.name,
      updateProductCategoryDTO.description,
    );
  }
}
