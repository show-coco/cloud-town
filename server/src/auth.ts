import dotenv from "dotenv"
import passport from "passport"
import passportJwt from "passport-jwt"
import UserRepository from './repository/UserRepository';
dotenv.config()

const jwtOptions = {
  // AuthorizationヘッダからJWTを取得
  // デフォルトでは"JWT"のプレフィックスを探す
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // JWTの署名に使用されるシークレット
  secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
  const userRepo = new UserRepository()
  const user = userRepo.getUserById(parseInt(payload.sub));
  if (user) {
      return done(null, user, payload);
  }
  return done(null);
}));