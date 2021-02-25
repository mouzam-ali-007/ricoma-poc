import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql'
import { ProductType } from '../inputTypes/productType'
import { Product } from '../entity/Product';
import { isAuth } from "../authentication/auth";
const {
    ApolloServer,
    ApolloError
} = require('apollo-server');

@Resolver()
export class ProductResolver {
    /* 
        Fetch Product of Company
    */
    @Query(() => [Product])
    // @UseMiddleware(isAuth)
    async fetchProducts(@Arg("companyId") companyId: string) {
        return await Product.find({ where: { companyId } })
    }

    /* 
        Add Product Mutation
    */
    @Mutation(() => Product)
    @UseMiddleware(isAuth)

    async addProduct(@Arg('data') data: ProductType): Promise<Product | undefined | null> {

        let getProduct = await Product.findOne({ where: { name: data.name }, relations: ['productSizes', 'productColors'] });
        if (getProduct) {
            throw new Error("Product Already Exist");
        } else {

            const product = Product.create(data)
            await product.save()
            return product
        }
    }

    /* 
      Update Product Mutation
    */

    @Mutation(() => Product)
    async updateProduct(@Arg("productId") productId: string, @Arg("data") data: ProductType): Promise<Product | undefined | null> {
        let product = await Product.findOne(productId);

        if (product) {
            product.name = data.name;
            product.details = data.details;
            product.quantity = data.quantity;

            await (Product).update(productId, product)
            return product
        }
        throw new Error(`Product with id: ${productId} does not exist!`);
    }

    /* 
      Delete Product Mutation
    */
    @Mutation(() => Product!, { nullable: true })
    async deleteProduct(
        @Arg("productId") productId: string
    ): Promise<Product | undefined | null> {
        const allProduct = await Product
        const product = await allProduct.findOne(productId)
        if (product) {
            await allProduct.delete(productId);
            return product;
        }
        throw new ApolloError(`Product with id: ${productId} does not exist!`, 'FAILURE', false);
    }
}
