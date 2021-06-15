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

export const resolvers = {
  Query: { books: (_parent: any, _args: any, context: any) => {
    if (!context.user) return null;

    return books;
  }},
}