import passport from 'passport'
import passportGoogle, { IOAuth2StrategyOption } from 'passport-google-oauth'
import UserRepository from '../core/adapter/repository/UserRepository/PUserRepository'
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
      let user = await userRepo.getUserByGoogleId(profile.id)
      if (!user && profile.emails) {
        user = await userRepo.createUser(
          profile.displayName,
          profile.id,
          profile.emails[0].value
        )
      }
      return done(null, user)
    })
  )
}
