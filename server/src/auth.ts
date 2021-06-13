import passport from "passport"
import passportJwt from "passport-jwt"
import UserRepository from './repository/UserRepository';

const jwtOptions = {
  // AuthorizationヘッダからJWTを取得
  // デフォルトでは"JWT"のプレフィックスを探す
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // JWTの署名に使用されるシークレット
  secretOrKey: process.env.TOKEN_SECRET,
  issuer: process.env.TOKEN_ISSUER,
  audience: process.env.TOKEN_AUDIENCE,
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
  const userRepo = new UserRepository()
  const user = userRepo.getUserById(parseInt(payload.sub));
  if (user) {
      return done(null, user, payload);
  }
  return done(null);
}));