import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateEdgeCapacityInput {
    @Field(type => Int)
    id:number;
}