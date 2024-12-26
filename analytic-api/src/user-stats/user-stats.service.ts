import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userStatsId } from 'common/config/user-stats.config';
import { userStats } from 'common/db/schemas/statistic/user-statistic.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserStatsService {
  constructor(
    @InjectModel(userStats.name) private userStats: Model<userStats>,
  ) {}

  async createStats() {
    const stats = await this.userStats.find().lean();
    if (stats.length > 0) {
      console.log('User Stats have in db ');
      return;
    }
    const newStats = new this.userStats({
      totalDebts: 0,
      totalUsers: 0,
      totalUsersWithDebt: 0,
    });
    await newStats.save();
  }

  async insertUserStatistic(data: IRequestUsersInfo) {
    const stats = await this.userStats.findById(userStatsId);
    if (!stats) {
      throw new NotFoundException('User Statistic not found');
    }

    stats.totalUsers += data.usersCount;
    stats.totalUsersWithDebt += data.usersWithDebt;
    stats.totalDebts += data.debts;
    await stats.save();
  }

  async updateUser(data: IRequestUserInfo) {
    console.log(data);
    const stats = await this.userStats.findById(userStatsId);
    if (!stats) {
      throw new NotFoundException('User Statistic not found');
    }
    if (data.debts > 0) {
      stats.totalUsersWithDebt += 1;
      stats.totalDebts += data.debts;
    }
    stats.totalUsers += 1;
    await stats.save();
  }

  async getUserStats() {
    const stats = await this.userStats.findById(userStatsId);
    if (!stats) {
      throw new NotFoundException('User Statistic not found');
    }
    return stats;
  }

  async removeUser(data: IRequestUserInfo) {
    const stats = await this.userStats.findById(userStatsId);
    if (!stats) {
      throw new NotFoundException('User Statistic not found');
    }
    if (data.debts > 0) {
      stats.totalUsersWithDebt -= 1;
      stats.totalDebts -= data.debts;
    }

    stats.totalUsers -= 1;
    await stats.save();

    return stats;
  }
}
