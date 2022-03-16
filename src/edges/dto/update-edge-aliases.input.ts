import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateEdgeAliasesInput {
    @Field(type => Int)
    id:number;
    
    @Field()
    node1_alias:string;

    @Field()
    node2_alias:string;
}