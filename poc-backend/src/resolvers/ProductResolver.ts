import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql'
import { ProductType } from '../inputTypes/productType'
import { Product } from '../entity/Product'
import { isAuth } from "../authentication/auth";

@Resolver()
export class ProductResolver {
    /* 
        Fetch Product for Company
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

    async addProduct(@Arg('data') data: ProductType) {
        let getProduct = await Product.findOne({ where: { name: data.name }, relations: ['productSizes', 'productColors'] });
        if (getProduct) {
            throw new Error("Already Exist");
        } else {

            const product = Product.create(data)
            console.log(product)
            await product.save()

            return product
        }
    }

    /* 
        Update Product Mutation
    */
    @Mutation(() => Product)
    @UseMiddleware(isAuth)

    async updateProduct(@Arg("input") { name, details, image, productId }: ProductType) {
        const product = await Product.findOne({ where: { name } })

        if (product) {
            product.name = name;
            product.details = details;

            let res = await Product.update(productId, product)

            console.log(res)
            return product

        } else {
            throw new Error("NOT FOUND");
        }
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
        throw new Error("NOT FOUND");
    }
}
