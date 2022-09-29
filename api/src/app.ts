import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { connectDB } from './utils/connectDB'
import session from 'express-session'
import passport from 'passport'
import bcrypt from 'bcrypt'
import User from './models/User'
import cookieParser from 'cookie-parser'
import { Strategy as LocalStrategy } from 'passport-local'

// Import routing
import serviceRoutes from './routes/services'
import peopleRoutes from './routes/people'
import songRoutes from './routes/song'
import userRoutes from './routes/user'
import optionRoutes from './routes/options'

// Configure application
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Connect to database
connectDB()

// Middleware
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 10 }, // 10 days
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// Passport
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Check if user with that email exists
    const user = await User.findOne({ email })
    if (!user) return done(null, false)
    // Verify password
    const verified = await bcrypt.compare(password, user.password)
    if (verified) return done(null, user)
    else return done(null, false)
  } catch (err) {
    return done(err)
  }
}))
passport.serializeUser((user: any, cb) => {
  cb(null, user.id)
})
passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await User.findById(id)
    if (!user) throw new Error('User does not exist')
    cb(null, { email: user.email })
  } catch (err) {
    cb(err)
  }
})


// Authentication
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Successfully logged in!')
})

app.get('/user', (req, res) => {
  res.send(req.user)
})

app.post('/register', async (req, res) => {
  const { email, first_name, last_name, password } = req?.body
  // Validate missing input
  if (!email || !first_name || !last_name || !password) {
    return res.send('Missing required option')
  }
  // Validate invalid input
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



// Routing
app.use('/api/services', serviceRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/users', userRoutes)
app.use('/api/options', optionRoutes)

app.listen(PORT, () => `Server listening on port: ${PORT}`)
