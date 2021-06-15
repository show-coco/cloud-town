import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const context = ({ req }: { req: Request }) => {
  const authorization = req.headers.authorization || ''

  if (!authorization) return null

  const secret: jwt.Secret = process.env.TOKEN_SECRET || ''

  // Remove "Bearer" prefix
  const token = authorization.split(' ')[1]

  try {
    const user = jwt.verify(token, secret)
    return { user }
  } catch (err) {
    console.error(err)
    throw new Error('token is not valid')
  }
}
