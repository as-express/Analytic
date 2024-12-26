import { Module } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';
import { UserStatsController } from './user-stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  userStats,
  userStatsSchema,
} from 'common/db/schemas/statistic/user-statistic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userStats.name, schema: userStatsSchema },
    ]),
  ],
  controllers: [UserStatsController],
  providers: [UserStatsService],
  exports: [UserStatsService],
})
export class UserStatsModule {}
