export const settings = {
  // Port
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
  // Google Auth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  // JWT
  JWT_TOKEN_SECRET: process.env.TOKEN_SECRET,
  JWT_TOKEN_ISSUER: process.env.TOKEN_ISSUER,
  JWT_TOKEN_AUDIENCE: process.env.TOKEN_AUDIENCE,
} as const
