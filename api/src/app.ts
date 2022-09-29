import * as dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { connectDB } from './utils/connectDB'
import configPassport from './config/passportLocal'
import serviceRoutes from './routes/services'
import peopleRoutes from './routes/people'
import songRoutes from './routes/song'
import optionRoutes from './routes/options'
import authRoutes from './routes/auth'

// Configuration
dotenv.config()
const app = express()
connectDB()
configPassport(passport)

// Middleware
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 10 }, // 10 days
  store: MongoStore.create({ client: mongoose.connection.getClient() })
}))
app.use(passport.initialize())
app.use(passport.session())

// Routing
app.use('/api/services', serviceRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/options', optionRoutes)
app.use('/api/auth', authRoutes)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
