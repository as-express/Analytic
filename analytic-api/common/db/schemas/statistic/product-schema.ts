import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface Item {
  title: string;
  sales: number;
}

@Schema()
export class productStats {
  @Prop()
  totalProductsType: number;

  @Prop()
  totalProductsCount: number;

  @Prop()
  totalSaleProductCount: number;

  @Prop()
  warehouseProductCount: number;

  @Prop()
  topProductSale: number;

  @Prop()
  totalProfit: number;

  @Prop()
  topSaleProducts: Item[];
}

export const productStatsSchema = SchemaFactory.createForClass(productStats);
