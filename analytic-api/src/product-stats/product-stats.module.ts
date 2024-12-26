import { Module } from '@nestjs/common';
import { ProductStatsService } from './product-stats.service';
import { ProductStatsController } from './product-stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  productStats,
  productStatsSchema,
} from 'common/db/schemas/statistic/product-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: productStats.name, schema: productStatsSchema },
    ]),
  ],
  controllers: [ProductStatsController],
  providers: [ProductStatsService],
  exports: [ProductStatsService],
})
export class ProductStatsModule {}
