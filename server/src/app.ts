import { ApolloServer, gql, ServerRegistration } from 'apollo-server-express'
import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { PathMapping } from './enum/app/PathMapping'
import { settings } from './settings'

const PORT = settings.PORT

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`

// The resolvers
const resolvers = {
  Query: { books: () => books },
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app } as ServerRegistration);

// Start the server
app.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}${PathMapping.graphiql} to run queries!`
  )
})
