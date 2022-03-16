import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateEdgeInput } from './dto/create-edge.input';
import { RemoveEdgeInput } from './dto/remove-edge.input';
import { UpdateEdgeAliasesInput } from './dto/update-edge-aliases.input';
import { UpdateEdgeCapacityInput } from './dto/update-edge-capacity.input';
import { Edge } from './edge.entity';
import { EdgesService } from './edges.service';

@Resolver(of => Edge)
export class EdgesResolver {
    constructor(private edgesService: EdgesService) {}

    @Query(returns => Edge)
    getEdge(@Args('id', { type: () => Int }) id: number): Promise<Edge> {
        return this.edgesService.getEdge(id);
    }

    @Query(returns => [Edge])
    getEdges(): Promise<Edge[]> {
        return this.edgesService.getEdges();
    }

    @Mutation(returns => Edge)
    createEdge(@Args('createEdgeInput')createEdgeInput: CreateEdgeInput) : Promise<Edge> {
        return this.edgesService.createEdge(createEdgeInput);
    }

    @Mutation(returns => Edge)
    updateEdgeCapacity(@Args('updateEdgeCapacityInput')updateEdgeCapacityInput: UpdateEdgeCapacityInput) : Promise<Edge> {
        return this.edgesService.updateEdgeCapacity(updateEdgeCapacityInput);
    }

    @Mutation(returns => Edge)
    updateEdgeAliases(@Args('updateEdgeAliasesInput')updateEdgeAliasesInput: UpdateEdgeAliasesInput) : Promise<Edge> {
        return this.edgesService.updateEdgeAliases(updateEdgeAliasesInput);
    }

    @Mutation(returns => Edge)
    removeEdge(@Args('removeEdgeInput')removeEdgeInput: RemoveEdgeInput) : Promise<Edge> {
        return this.edgesService.removeEdge(removeEdgeInput);
    }
}
