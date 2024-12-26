import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStatsModule } from './user-stats/user-stats.module';
import { ProductStatsModule } from './product-stats/product-stats.module';
import { UserStatsService } from './user-stats/user-stats.service';
import { ProductStatsService } from './product-stats/product-stats.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://expressaset:1234@asetsila.6ld82.mongodb.net/Analytic?retryWrites=true&w=majority&appName=AsetSila',
    ),
    UserStatsModule,
    ProductStatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private userService: UserStatsService,
    private productService: ProductStatsService,
  ) {}

  async onModuleInit() {
    await this.productService.createStats();
    await this.userService.createStats();
  }
}
