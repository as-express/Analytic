import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { productStatsId } from 'common/config/product-stats.config';
import { productStats } from 'common/db/schemas/statistic/product-schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductStatsService {
  constructor(
    @InjectModel(productStats.name) private productStats: Model<productStats>,
  ) {}

  async createStats() {
    const stats = await this.productStats.find().lean();
    if (stats.length > 0) {
      console.log('User Stats have in db ');
      return;
    }
    const newStats = new this.productStats({
      topProductSale: 0,
      topSaleProducts: 0,
      totalProductsCount: 0,
      totalProductsType: 0,
      totalProfit: 0,
      totalSaleProductCount: 0,
      warehouseProductCount: 0,
    });
    await newStats.save();
  }

  async insertMany(data: IRequestProductsInfo) {
    const stats = await this.productStats.findById(productStatsId);
    if (!stats) {
      throw new NotFoundException('Product not found');
    }

    stats.totalProductsType += data.totalProductType;
    stats.totalProductsCount += data.totalQuantity;
    stats.totalProfit += data.totalProfit;
    stats.totalSaleProductCount += data.totalSalesCount;
    stats.warehouseProductCount += data.warehouseProductsCount;

    await stats.save();
  }

  async insertOne(data: IRequestProductInfo) {
    const stats = await this.productStats.findById(productStatsId);
    if (!stats) {
      throw new NotFoundException('Product not found');
    }

    stats.totalProductsCount += 1;
    stats.totalProductsCount += data.quantity;
    stats.totalProfit += data.profit;
    stats.warehouseProductCount += data.warehouseProductsCunt;

    await stats.save();
  }

  async removeProduct(data: IRequestProductInfo) {
    const stats = await this.productStats.findById(productStatsId);
    if (!stats) {
      throw new NotFoundException('Product not found');
    }
    stats.totalProductsCount -= 1;
    stats.totalProductsCount -= data.quantity;
    stats.totalProfit -= data.profit;
    stats.warehouseProductCount -= data.warehouseProductsCunt;

    await stats.save();
  }

  async getProducts() {
    const stats = await this.productStats.findById(productStatsId);
    return stats;
  }
}
