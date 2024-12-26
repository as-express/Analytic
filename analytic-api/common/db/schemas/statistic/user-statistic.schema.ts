import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class userStats {
  @Prop()
  totalUsers: number;

  @Prop()
  totalUsersWithDebt: number;

  @Prop()
  totalDebts: number;

  @Prop()
  highDebtUsers: number;
}

export const userStatsSchema = SchemaFactory.createForClass(userStats);
