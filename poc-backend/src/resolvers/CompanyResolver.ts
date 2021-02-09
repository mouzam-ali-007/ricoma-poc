import {
    Resolver, Query, Mutation, Arg, UseMiddleware, Ctx
} from 'type-graphql'
import { sign } from "jsonwebtoken";
import { CompanyType } from '../inputTypes/companyType'
import { Company } from '../entity/Company';
import { hash, compare } from "bcryptjs";
import { isAuth } from "../authentication/auth";
import {
    SECRET_KEY, INCORRECT_PASSWORD,
    IS_EXISTS, NOT_FOUND
} from '../Utils/Constants';
import { Context } from "../authentication/context";


@Resolver()
export class CompanyResolver {
    @Query(() => [Company])
    @UseMiddleware(isAuth)
    async companies() {
        return await Company.find()
    }

    @Query((_id) => [Company])
    async findComapany() {
        return await Company.find()
    }

    /* 
        Login With Company Email and Password
    */
    @Mutation(() => Company)
    async login(@Arg("email") email: string, @Arg("password") password: string) {
        const company = await Company.findOne({ where: { email } });
        if (!company) {
            throw new Error(NOT_FOUND);
        }

        const verify = await compare(password, company.password);

        if (!verify) {
            throw new Error(INCORRECT_PASSWORD);
        }

        const accessToken = sign({ companyId: company._id }, SECRET_KEY, {
            expiresIn: "1d"
        })
        console.log(email, password, company, accessToken)

        return {
            accessToken
        };
    }
    /* 
        Register New Company
    */
    @Mutation(() => Company)
    async registerCompany(@Arg('data') data: CompanyType) {

        const isCompanyExist = await Company.findOne({ where: { email: data.email } });
        if (isCompanyExist) {
            throw new Error(IS_EXISTS);
        }

        const hashedPassword = await hash(data.password, 13);
        data.password = hashedPassword;
        console.log('DATA', data);
        const company = Company.create(data)

        console.log(company)
        await company.save()

        return company
    }
}
