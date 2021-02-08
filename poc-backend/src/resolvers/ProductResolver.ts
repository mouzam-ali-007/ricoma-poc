import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql'
import { ProductType } from '../inputTypes/productType'
import { Product } from '../entity/Product'
import { isAuth } from "../authentication/auth";

@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    @UseMiddleware(isAuth)
    async products() {
        return await Product.find()
    }

    @Query((_id) => [Product])
    async findProducts() {
        console.log('Query', await Product.find())
        return await Product.find()
    }

    @Mutation(() => Product)
    @UseMiddleware(isAuth)

    async registerProduct(@Arg('data') data: ProductType) {

        const company = Product.create(data)

        console.log(company)
        await company.save()

        return company
    }
}
