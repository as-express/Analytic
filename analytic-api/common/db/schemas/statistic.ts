import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class globalStatistic {
  @Prop()
  totalItems: number;

  @Prop()
  profit: number;

  @Prop()
  decreases: number;
}
export const globalStatisticSchema =
  SchemaFactory.createForClass(globalStatistic);
