import { Router, Request, Response } from 'express'
import passport from 'passport'
import { tokenGenerator } from '../../../../auth/tokenGenerator'

function generateUserToken(req: Request, res: Response) {
  console.log(req.user)
  const accessToken = tokenGenerator(req.user.id)
  res.redirect(`http://localhost:3000/authenticated?token=${accessToken}`)
}

export function AuthRouter(router: Router): void {
  router.get(
    '/api/authentication/google/start',
    passport.authenticate('google', {
      session: false,
      scope: ['openid', 'profile', 'email'],
    })
  )

  router.get(
    '/api/authentication/google/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken
  )

  router.get(
    '/api/secure',
    passport.authenticate(['jwt'], { session: false }),
    (req, res) => {
      res.send('Secure response from ' + JSON.stringify(req.user))
    }
  )
}
