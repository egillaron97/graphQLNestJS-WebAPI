import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class RemoveEdgeInput {
    @Field(type => Int)
    id:number;
}