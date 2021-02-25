import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Color extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  color: string;

  @Field(() => Product, { nullable: true })
  @ManyToOne(() => Product, product => product.productColor, { lazy: true })
  product: Product;

}