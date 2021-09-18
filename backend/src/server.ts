import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import { typeDefs } from './graphql/schema'
import { Resolvers } from './types/graphql'

const prisma = new PrismaClient()

const resolvers: Resolvers = {
  Mutation: {
    createCommunity: async (_, { input }) => {
      const { name, slug, description, thumbnailUrl, title } = input

      console.log(input)
      const community = await prisma.community.create({
        data: {
          name,
          slug,
          description,
          title,
          thumbnail_url: thumbnailUrl,
          category_id: 'Programming',
        },
      })
      console.log(community)

      return community.id
    },
  },
  Query: {
    healthCheck: () => {
      return true
    },
  },
}

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
