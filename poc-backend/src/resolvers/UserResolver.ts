import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { CreateUserInput } from '../inputTypes/userInputTypes'
import { User } from '../entity/User'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    console.log('Queryr')
    return await User.find()
  }

  @Mutation(() => User)
  async registerUser(@Arg('data') data: CreateUserInput) {
    const user = User.create(data)

    console.log(user)
    await user.save()

    return user
  }
}
