import { Controller, Get } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user-stats')
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get()
  async getStats() {
    return this.userStatsService.getUserStats();
  }

  @MessagePattern('insert_users')
  async insertUsers(data: IRequestUsersInfo) {
    return this.userStatsService.insertUserStatistic(data);
  }

  @MessagePattern('insert_user')
  async updateUserStats(data: IRequestUserInfo) {
    return this.userStatsService.updateUser(data);
  }

  @MessagePattern('remove_user')
  async removeUser(data: IRequestUserInfo) {
    return this.userStatsService.removeUser(data);
  }
}
