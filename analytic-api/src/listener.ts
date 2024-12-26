import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
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
  });

  app.listen();
}
bootstrap();
