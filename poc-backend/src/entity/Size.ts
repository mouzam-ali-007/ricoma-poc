import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Size extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    size: string;

    @Field(() => Product, { nullable: true })
    @ManyToOne(() => Product, product => product.productSize, { lazy: true })
    product: Product;

}