import { PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../models/User'

export default function configPassport(passport: PassportStatic) {
  // Configure local strategy to authenticate email and password saved in database
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      // Verify email exists
      const user = await User.findOne({ email })
      if (!user) return done(null, false)
      // Verify password matches password for email
      const verified = await bcrypt.compare(password, user.password)
      if (verified) return done(null, user)
      else return done(null, false)
    } catch (err) {
      return done(err)
    }
  }))

  // Save user id as cookie
  passport.serializeUser((user: any, cb) => {
    cb(null, user.id)
  })

  // Get user id from cookie
  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await User.findById(id)
      if (!user) throw new Error('User does not exist')
      cb(null, { id: user.id })
    } catch (err) {
      cb(err)
    }
  })
}