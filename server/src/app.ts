import { ApolloServer, ServerRegistration } from 'apollo-server-express'
import { execute, subscribe } from 'graphql'
import {
  ConnectionParams,
  SubscriptionServer,
} from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { createServer } from 'http'
import dotenv from 'dotenv'
import express from 'express'
import { resolvers } from './core/adapter/graphql/resolver'
import { typeDefs } from './core/adapter/graphql/schema'
import { AuthRouter } from './core/adapter/rest/routes'
import cors from 'cors'
import { context } from './core/adapter/graphql/context'
import { PathMapping } from './enum/app/PathMapping'
dotenv.config()
import './auth/jwt'
import './auth/google'
import jwt from 'jsonwebtoken'
import { settings } from './settings'

export const app = express()
app.use(cors())
const router = express.Router()
app.use('/', router)

// Health Check用
app.get(PathMapping.health, (req, res) => {
  res.send('Ok')
})
AuthRouter(router)

const schema = makeExecutableSchema({ typeDefs, resolvers })
const server = new ApolloServer({ schema, context })

const httpServer = createServer(app)
server.applyMiddleware({ app } as ServerRegistration)
SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    onConnect: (connectionParams: { Authorization: string }) => {
      if (connectionParams.Authorization.split(' ')[0] !== 'Bearer')
        throw new Error(
          'Please request with Bearer prefix on Aurhorization header'
        )
      const token = connectionParams.Authorization.split(' ')[1]

      const res = jwt.verify(token, settings.JWT_TOKEN_SECRET, {
        audience: settings.JWT_TOKEN_AUDIENCE,
        issuer: settings.JWT_TOKEN_ISSUER,
      })

      return {
        user: {
          sub: res.sub,
        },
      }
    },
  },
  { server: httpServer, path: server.graphqlPath }
)

export { httpServer }
