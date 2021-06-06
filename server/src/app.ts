import { ApolloServer, ServerRegistration } from 'apollo-server-express'
import express from 'express'
import { importSchema } from 'graphql-import';
import { PathMapping } from './enum/app/PathMapping'
import { settings } from './settings'

// Application Port
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

// GraphQL型定義
const typeDefs = importSchema(`${__dirname}/schema/schema.graphql`);

// The resolvers
const resolvers = {
  Query: { books: () => books },
}

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app } as ServerRegistration);

// Start the server
app.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}${PathMapping.graphiql} to run queries!`
  )
})
