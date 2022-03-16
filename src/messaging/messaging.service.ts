import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UpdateEdgeAliasesInput } from 'src/edges/dto/update-edge-aliases.input';
import { EdgesService } from 'src/edges/edges.service';

@Injectable()
export class MessagingService {
    constructor(
        private readonly edgesService: EdgesService,
        private readonly amqpConnection: AmqpConnection) {}
    @RabbitSubscribe({
        exchange: 'update-alias',
        routingKey: '',
        queue: 'update-alias-queue',
    })
    
    public async pubSubHandler(msg: {}) {
        console.log('Received message: ' + JSON.stringify(msg));

        let updateInput = new UpdateEdgeAliasesInput();

        if ('id' in msg && 'node1_alias' in msg && 'node2_alias' in msg) {
            updateInput.id = msg['id'];
            updateInput.node1_alias = msg['idnode1_alias'];
            updateInput.node2_alias = msg['node2_alias'];
        }
        else {
            console.log(msg);
            this.amqpConnection.publish('update-alias', '',
                'ERROR: Please include "id", "node1_alias" and "node2_alias" in json input');
            return;
        }

        await this.edgesService.updateEdgeAliases(updateInput);
    }
}