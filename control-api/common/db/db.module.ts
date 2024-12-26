import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'as-express',
      password: '1234',
      database: 'nodejs',
      entities: [User, Product],
      synchronize: true,
    }),
  ],
})
export class DbModule {}
