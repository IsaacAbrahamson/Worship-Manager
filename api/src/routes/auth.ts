import express, { Request, Response } from 'express'
import User from '../models/User'
import passport from 'passport'
import bcrypt from 'bcrypt'
const router = express.Router()

// Authenticate email and password and get user from session
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
})

// Get current user from session
router.get('/user', (req, res) => {
  res.send(req.user)
})


// Create a new user in database
router.post('/register', async (req, res) => {
  const { email, first_name, last_name, password } = req?.body

  // Validate missing body option
  if (!email || !first_name || !last_name || !password) {
    return res.send('Missing required option')
  }

  // Validate invalid body option
  if (typeof email !== "string" || typeof first_name !== "string" || typeof last_name !== "string" || typeof password !== "string") {
    return res.send('Invalid option')
  }

  // Validate user exists
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.send('User already exists')
    }
  } catch (err) {
    console.log(err)
    res.send(err)
  }

  // Create new user
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({ email, first_name, last_name, password: hashedPassword })
    await newUser.save()
    res.send({ newUser })
  } catch (err) {
    console.log(err)
    res.send({ err })
  }
})

export default router