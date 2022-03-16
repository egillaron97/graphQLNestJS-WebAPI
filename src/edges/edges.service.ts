import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEdgeInput } from './dto/create-edge.input';
import { RemoveEdgeInput } from './dto/remove-edge.input';
import { UpdateEdgeAliasesInput } from './dto/update-edge-aliases.input';
import { UpdateEdgeCapacityInput } from './dto/update-edge-capacity.input';
import { Edge } from './edge.entity';

@Injectable()
export class EdgesService {
    constructor(
        @InjectRepository(Edge) private edgesRepository: Repository<Edge>,
        private readonly amqpConnection: AmqpConnection) {}

    private getRandomCapacity(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - 1 - min) + min - 1)
    }

    getEdge(id: number): Promise<Edge> {
        return this.edgesRepository.findOneOrFail(id)
    }
      
    getEdges(): Promise<Edge[]> {
        return this.edgesRepository.find();
    }

    createEdge(createEdgeInput: CreateEdgeInput): Promise<Edge> {
        let newEdge = this.edgesRepository.create(createEdgeInput);
        newEdge.capacity = this.getRandomCapacity(10000, 1000000);

        const message = 'New channes between ' + newEdge.node1_alias + ' and ' + 
            newEdge.node2_alias + ' with capacity of ' + newEdge.capacity + ' has been created.';
        
        this.amqpConnection.publish('new-channel', '', message);
        console.log(message);

        return this.edgesRepository.save(newEdge);
    }

    updateEdgeCapacity(updateEdgeCapacityInput: UpdateEdgeCapacityInput): Promise<Edge> {
        this.edgesRepository.update(updateEdgeCapacityInput.id, { capacity:this.getRandomCapacity(10000, 1000000) });
        return this.edgesRepository.findOneOrFail(updateEdgeCapacityInput.id);
    }

    updateEdgeAliases(updateEdgeAliasesInput: UpdateEdgeAliasesInput): Promise<Edge> {
        this.edgesRepository.update(
            updateEdgeAliasesInput.id, 
            { node1_alias:updateEdgeAliasesInput.node1_alias, node2_alias:updateEdgeAliasesInput.node2_alias })
            return this.edgesRepository.findOneOrFail(updateEdgeAliasesInput.id); 
    }

    removeEdge(removeEdgeInput: RemoveEdgeInput): Promise<Edge> {
        const edge = this.edgesRepository.findOneOrFail(removeEdgeInput.id);
        this.edgesRepository.delete(removeEdgeInput.id);
        return edge;
    }
}
