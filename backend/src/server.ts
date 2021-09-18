import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolver'

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
app.use(cors())
server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send('Welcome from a Node.js app!')
})

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
)
