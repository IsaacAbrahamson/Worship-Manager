import express from 'express'
import * as dotenv from 'dotenv'
import { connectDB } from './utils/connectDB'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import mongoose from 'mongoose'
import { Strategy as LocalStrategy } from 'passport-local'
import configPassport from './config/passportLocal'

// Import routing
import serviceRoutes from './routes/services'
import peopleRoutes from './routes/people'
import songRoutes from './routes/song'
import optionRoutes from './routes/options'
import authRoutes from './routes/auth'

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
  store: MongoStore.create({ client: mongoose.connection.getClient() })
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())
configPassport(passport)

// Routing
app.use('/api/services', serviceRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/options', optionRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => `Server listening on port: ${PORT}`)
