import { Request } from "express"
import jwt from 'jsonwebtoken';

export const context = async ({ req }: {req: Request}) => {
  const authorization = req.headers.authorization || '';
  
  const secret: jwt.Secret = process.env.TOKEN_SECRET || ""

  // Remove "Bearer" prefix
  const token = authorization.split(" ")[1]
  
  try {
    const user = await jwt.verify(token, secret)
    return { user };
  }catch(err) {
    console.error(err)
    throw new Error("token is not valid")
  }
}