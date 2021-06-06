import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { settings } from './settings';
import { PathMapping } from './enum/app/pathMapping';

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
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use(PathMapping.graphql, express.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use(PathMapping.graphiql, graphiqlExpress({ endpointURL: PathMapping.graphql }));

// Start the server
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}${PathMapping.graphiql} to run queries!`);
});
