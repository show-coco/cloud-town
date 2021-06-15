import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getAuthor(id: String!): Author
    books: [Book]
  }

  type Author {
    name: String
    id: ID
  }

  type Book {
    title: String,
    author: String
  }
`;