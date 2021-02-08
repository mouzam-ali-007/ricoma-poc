import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { CompanyResolver } from './resolvers/CompanyResolver'
import { ProductResolver } from './resolvers/ProductResolver'


async function runServer() {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [CompanyResolver, ProductResolver],
  })

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  })
  await server.listen(4000)

  console.log('Server started at port :: 4000')
}

runServer()
