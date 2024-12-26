import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'common/db/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'USER_ANALYTIC',
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
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
