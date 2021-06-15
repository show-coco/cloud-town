import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    books: [Book]
    community: Community
  }

  type Book {
    title: String
    author: String
  }

  type Community {
    id: Int
  }
`
