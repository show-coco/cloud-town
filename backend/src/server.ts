import express from 'express'
import cors from 'cors'
import { ApolloServer, gql } from 'apollo-server-express'

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books,
  },
}

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

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
