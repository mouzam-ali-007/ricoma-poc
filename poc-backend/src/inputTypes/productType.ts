import { InputType, Field } from 'type-graphql'

@InputType()
export class ProductType {
    @Field()
    name: string

    @Field()
    details: string

    @Field()
    image: string

    @Field()
    quantity: number

    @Field()
    productSizes: String

    @Field()
    productColors: String


    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
