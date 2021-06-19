import { ApolloServer, ServerRegistration } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import { resolvers } from './core/adapter/graphql/resolver'
import { typeDefs } from './core/adapter/graphql/schema'
import { AuthRouter } from './core/adapter/rest/routes'
import cors from 'cors'
import { context } from './core/adapter/graphql/context'
dotenv.config()
require('./auth/jwt')
require('./auth/google')

const server = new ApolloServer({ typeDefs, resolvers, context })

const app = express()
app.use(cors())

server.applyMiddleware({ app } as ServerRegistration)

const router = express.Router()
app.use('/', router)

AuthRouter(router)

export { app }
