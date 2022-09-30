import express, { Request, Response } from 'express'
import User from '../models/User'
import passport from 'passport'
import bcrypt from 'bcrypt'
const router = express.Router()

// Password is not used when user is sent to client
export interface AppUser {
  email: string
  first_name: string
  last_name: string
  password?: string
  save?: any
}

// Authenticate email and password and get user from session
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(400).send({ err })
    res.send('success')
  })
})

// Get current user from session
router.get('/user', (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user)
  } else {
    // The user is not logged in
    return res.status(204).send()
  }
})


// Create a new user in database
router.post('/register', async (req, res) => {
  const { email, first_name, last_name, password } = req?.body

  // Validate missing body option
  if (!email || !first_name || !last_name || !password) {
    return res.status(400).send('Missing required option')
  }

  // Validate invalid body option
  if (typeof email !== "string" || typeof first_name !== "string" || typeof last_name !== "string" || typeof password !== "string") {
    return res.status(400).send('Invalid option')
  }

  // Validate user exists
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send('User already exists')
    }
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }

  // Create new user
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({ email, first_name, last_name, password: hashedPassword }) as AppUser
    await newUser.save()
    // do not send password to client
    delete newUser.password
    res.status(200).send({ newUser })
  } catch (err) {
    console.log(err)
    res.send({ err })
  }
})

export default router