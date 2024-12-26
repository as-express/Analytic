import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'common/db/entities/product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_ANALYTIC',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://epvsgzdz:4TyK1OUcgwa_PvR06dqJdvIroiLcPQ48@moose.rmq.cloudamqp.com/epvsgzdz',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
