import jwt from 'jsonwebtoken'

export const tokenGenerator = (userId: string): string => {
  const expiresIn = '7 days'
  const issuer = process.env.TOKEN_ISSUER
  const audience = process.env.TOKEN_AUDIENCE
  const secret = process.env.TOKEN_SECRET || ''

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId.toString(),
  })

  return token
}
