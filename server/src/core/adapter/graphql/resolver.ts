import { Resolvers } from "../../../types/graphql";

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

export const resolvers: Resolvers = {
  Query: { books: (_parent, _args, context) => {
    if (!context.userId) return null;

    return books;
  }},
}