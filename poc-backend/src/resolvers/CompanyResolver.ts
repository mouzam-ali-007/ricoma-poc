import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql'
import { sign } from 'jsonwebtoken'
import { CompanyType } from '../inputTypes/companyType'
import { Company } from '../entity/Company'
import { hash, compare } from 'bcryptjs'
import { isAuth } from '../authentication/auth'
import { Context } from '../authentication/context'

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  @UseMiddleware(isAuth)
  async getAllCompanies() {
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
  async login(@Arg('email') email: string, @Arg('password') password: string) {
    const company: Company = await Company.findOne({ where: { email } })
    if (!company) {
      throw new Error('Could not find company')
    }

    const verify = await compare(password, company.password)

    if (!verify) {
      throw new Error('Incorrect password')
    }

    const accessToken = sign({ companyId: company._id }, 'MySecretKey', {
      expiresIn: '1d',
    })
    console.log(email, password, company, accessToken)
    company.accessToken = accessToken
    return company
  }
  /* 
        Register New Company
    */
  @Mutation(() => Company)
  async registerCompany(@Arg('data') data: CompanyType) {
    const isCompanyExist = await Company.findOne({
      where: { email: data.email },
    })
    if (isCompanyExist) {
      throw new Error('Company Already Exists')
    }

    const hashedPassword = await hash(data.password, 13)
    data.password = hashedPassword
    console.log('DATA', data)
    const company = Company.create(data)

    console.log(company)
    await company.save()

    return company
  }
}
