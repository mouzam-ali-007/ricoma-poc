import { Company } from "./entity/Company";
import { Product } from "./entity/Product";
import { IMAGE_URL, COMPANIES, PRODUCTS } from "./Utils/Constants";
import { Color } from "./entity/Color";
import { Size } from "./entity/Size";
import { createConnection } from "typeorm";
import { hash } from "bcryptjs";


async function runSeedFile() {
    await createConnection()
    for (let i = 0; i < COMPANIES; i++) {

        let company = new Company();

        company.name = `Company_${Math.random().toString(36).substring(6)}`;
        company.email = `${company.name}_${Math.random().toString(36).substring(6)}@gmail.com`;
        company.password = await hash('qwerty', 13);
        company.address = `Address ${Date.now()}`;
        company.contact = `+1 ${Date.now()}`;

        const companyData = Company.create(company)

        await companyData.save().then(async (data) => {

            for (let j = 0; j < PRODUCTS; j++) {
                let product = new Product();
                product.name = `Product ${Math.random().toString(36).substring(6)}`;
                product.details = `New Product ${Math.random().toString(36).substring(6)}`;
                product.image = IMAGE_URL;
                product.companyId = <any>data._id;
                product.productColor = ['#0010']
                product.productSize = ['L']

                const productData = Product.create(product);

                productData.save().then(async prodData => {
                    console.log('Product', prodData);
                })
            }

        })

    }
    console.log('Data Seeded Successfully');
}

runSeedFile();
