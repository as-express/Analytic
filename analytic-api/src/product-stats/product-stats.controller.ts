import { Controller, Get } from '@nestjs/common';
import { ProductStatsService } from './product-stats.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product-stats')
export class ProductStatsController {
  constructor(private readonly productStatsService: ProductStatsService) {}

  @MessagePattern('insert_products')
  async insertProducts(data: IRequestProductsInfo) {
    return this.productStatsService.insertMany(data);
  }

  @MessagePattern('insert_product')
  async insertProduct(data: IRequestProductInfo) {
    return this.productStatsService.insertOne(data);
  }

  @MessagePattern('remove_product')
  async removeProduct(data: IRequestProductInfo) {
    return this.productStatsService.removeProduct(data);
  }

  @Get()
  async getProducts() {
    return this.productStatsService.getProducts();
  }
}
