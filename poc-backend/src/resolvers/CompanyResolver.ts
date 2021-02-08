import {
    Resolver, Query, Mutation, Arg, UseMiddleware, Ctx
} from 'type-graphql'
import { sign } from "jsonwebtoken";
import { CompanyType } from '../inputTypes/companyType'
import { Company } from '../entity/Company';
import { hash, compare } from "bcryptjs";
import { isAuth } from "../authentication/auth";
import { Context } from "../authentication/context";


@Resolver()
export class CompanyResolver {
    @Query(() => [Company])
    @UseMiddleware(isAuth)
    async compnaies() {
        return await Company.find()
    }

    @Query((_id) => [Company])
    async findComapany() {
        return await Company.find()
    }

    @Mutation(() => Company)

    async login(@Arg("email") email: string, @Arg("password") password: string) {
        const company = await Company.findOne({ where: { email } });
        if (!company) {
            throw new Error("Could not find company");
        }

        const verify = await compare(password, company.password);

        if (!verify) {
            throw new Error("Bad password");
        }

        const accessToken = sign({ companyId: company._id }, "MySecretKey", {
            expiresIn: "1d"
        })
        console.log(email, password, company, accessToken)

        return {
            accessToken
        };
    }
    @Mutation(() => Company)
    async registerCompany(@Arg('data') data: CompanyType) {

        const hashedPassword = await hash(data.password, 13);
        data.password = hashedPassword;
        console.log('DATA', data);
        const company = Company.create(data)

        console.log(company)
        await company.save()

        return company
    }
}
