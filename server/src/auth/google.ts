import passport from 'passport'
import passportGoogle from 'passport-google-oauth'
import UserRepository from '../core/adapter/repository/UserRepository/PUserRepository'

const passportConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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
      if (!user) {
        user = await userRepo.createUser(profile.displayName, 'google', profile.id)
      }
      return done(null, user)
    })
  )
}
