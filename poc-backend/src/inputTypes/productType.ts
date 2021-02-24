import { InputType, Field } from 'type-graphql'
import { Size } from '../entity/Size'
import { Color } from '../entity/Color'

@InputType()
export class ProductType {

    @Field({ nullable: true })
    productId: string

    @Field()
    name: string

    @Field()
    details: string

    @Field()
    image: string

    @Field()
    quantity: number

    @Field(() => [String], { nullable: true })
    productSize: String[]

    @Field(() => [String], { nullable: true })
    productColor: string[]

    @Field()
    companyId: string


    @Field({ nullable: true })
    createdAt: Date

    @Field({ nullable: true })
    updatedAt: Date
}
