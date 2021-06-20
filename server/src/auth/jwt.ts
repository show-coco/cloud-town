import passport from 'passport'
import passportJwt, { StrategyOptions } from 'passport-jwt'
import UserRepository from '../core/adapter/repository/UserRepository/PUserRepository'
import { settings } from '../settings'

const jwtOptions: StrategyOptions = {
  // AuthorizationヘッダからJWTを取得
  // デフォルトでは"JWT"のプレフィックスを探す
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // JWTの署名に使用されるシークレット
  secretOrKey: settings.JWT_TOKEN_SECRET,
  issuer: settings.JWT_TOKEN_ISSUER,
  audience: settings.JWT_TOKEN_AUDIENCE,
}

passport.use(
  new passportJwt.Strategy(jwtOptions, (payload: { sub: string }, done) => {
    const userRepo = new UserRepository()
    const user = userRepo.getUserById(parseInt(payload.sub))
    if (user) {
      return done(null, user, payload)
    }
    return done(null)
  })
)
