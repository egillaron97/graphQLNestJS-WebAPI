import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { EdgesResolver } from './edges.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edge } from './edge.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingService } from '../messaging/messaging.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Edge]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'new-channel',
          type: 'topic',
        },
        {
          name: 'update-alias',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5673',
      channels: {
        'channel-1': {
          default: true,
        },
      },
    }),],
  providers: [EdgesService, EdgesResolver, MessagingService]
})
export class EdgesModule {}
