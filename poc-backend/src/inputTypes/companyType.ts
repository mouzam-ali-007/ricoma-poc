import { InputType, Field } from 'type-graphql'
import { IsEmail } from "class-validator";

@InputType()
export class CompanyType {
    @Field()
    name: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    password: string


    @Field()
    contact: string

    @Field()
    address: string

    // @Field()
    // createdAt: Date

    // @Field()
    // updatedAt: Date
}
