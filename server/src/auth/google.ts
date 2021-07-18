import passport from 'passport'
import passportGoogle, { IOAuth2StrategyOption } from 'passport-google-oauth'
import UserRepository from '../core/adapter/repository/UserRepository/PUserRepository'
import User from '../core/domain/entities/User'
import { settings } from '../settings'

const passportConfig: IOAuth2StrategyOption = {
  clientID: settings.GOOGLE_CLIENT_ID,
  clientSecret: settings.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/api/authentication/google/redirect',
}

if (passportConfig.clientID) {
  passport.use(
    new passportGoogle.OAuth2Strategy(passportConfig, async function (
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      const userRepo = new UserRepository()
      try {
        const user = await userRepo.getUserByGoogleId(profile.id)
        done(null, user)
      } catch (error) {
        if (profile.emails) {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            slug: profile.id,
            googleId: profile.id,
          })
          const user = await userRepo.createUser(newUser)
          return done(null, user)
        }
      }
    })
  )
}
