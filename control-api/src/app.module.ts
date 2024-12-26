import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'common/db/db.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DbModule, UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
