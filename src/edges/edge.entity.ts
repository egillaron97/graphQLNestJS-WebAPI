import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Edge {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" })
    @Field()
    created_at: Date;

    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        onUpdate: "CURRENT_TIMESTAMP(6)" })
    @Field()
    updated_at: Date;

    @Column()
    @Field(type => Int)
    capacity: number;
    
    @Column()
    @Field()
    node1_alias: string;

    @Column()
    @Field()
    node2_alias: string;
}