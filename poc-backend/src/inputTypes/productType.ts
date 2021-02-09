import { InputType, Field } from 'type-graphql'

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

    @Field()
    productSizes: String

    @Field()
    productColors: String

    @Field()
    companyId: string


    @Field({ nullable: true })
    createdAt: Date

    @Field({ nullable: true })
    updatedAt: Date
}
