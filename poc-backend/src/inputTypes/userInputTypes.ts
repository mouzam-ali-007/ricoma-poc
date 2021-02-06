import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateUserInput {
  @Field()
  firstname: string

  @Field()
  lastname: string

  @Field()
  age: number

  @Field()
  email: string

  @Field()
  password: string
}
