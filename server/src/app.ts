import { ApolloServer, ServerRegistration } from 'apollo-server-express'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { importSchema } from 'graphql-import'
import passport from 'passport'
import { tokenGenerator } from './auth/tokenGenerator'
import { PathMapping } from './enum/app/PathMapping'
import { settings } from './settings'
dotenv.config()
require('./auth/jwt')
require('./auth/google')

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
const typeDefs = importSchema(`${__dirname}/schema/schema.graphql`)

// The resolvers
const resolvers = {
  Query: { books: () => books },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app } as ServerRegistration)

function generateUserToken(req: Request, res: Response) {
  const accessToken = tokenGenerator(req.user.id)
  res.redirect(`http://localhost:3000/authenticated?token=${accessToken}`)
}

app.get(
  '/api/authentication/google/start',
  passport.authenticate('google', {
    session: false,
    scope: ['openid', 'profile', 'email'],
  })
)
app.get(
  '/api/authentication/google/redirect',
  passport.authenticate('google', { session: false }),
  generateUserToken
)

app.get(
  '/api/secure',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    res.send('Secure response from ' + JSON.stringify(req.user))
  }
)

// Start the server
app.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}${PathMapping.graphiql} to run queries!`
  )
})
