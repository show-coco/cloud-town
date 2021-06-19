import { ApolloServer, ServerRegistration } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import { resolvers } from './core/adapter/graphql/resolver'
import { typeDefs } from './core/adapter/graphql/schema'
import { AuthRouter } from './core/adapter/rest/routes'
import cors from 'cors'
import { context } from './core/adapter/graphql/context'
import { PathMapping } from './enum/app/PathMapping'
dotenv.config()
require('./auth/jwt')
require('./auth/google')

const server = new ApolloServer({ typeDefs, resolvers, context })

const app = express()
app.use(cors())

server.applyMiddleware({ app } as ServerRegistration)

const router = express.Router()
app.use('/', router)

// Health Check用
app.get(PathMapping.health, (req, res) => {
  res.send('Ok')
})

AuthRouter(router)

export { app }
