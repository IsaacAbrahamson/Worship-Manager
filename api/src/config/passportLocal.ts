import { PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../models/User'

// Password is not used when user is sent to client
export interface AppUser {
  email: string
  first_name: string
  last_name: string
  password?: string
}

export default function configPassport(passport: PassportStatic) {
  // Configure local strategy to authenticate email and password saved in database
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done) => {
    try {
      // Verify email exists
      const user = await User.findOne({ email })
      if (!user) return done(null, false)
      // Verify password matches password for email
      const verified: boolean = await bcrypt.compare(password, user.password)
      if (verified) return done(null, user)
      else return done(null, false)
    } catch (err) {
      return done(err)
    }
  }))

  // Save user id as cookie
  passport.serializeUser((user: any, done) => {
    done(null, user.id)
  })

  // Get user from cookie
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id) as AppUser
      if (!user) throw new Error('User does not exist')

      // Do not send password to client
      delete user.password
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
}