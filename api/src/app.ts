import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'

// Import routing
import serviceRoutes from './routes/services'
import peopleRoutes from './routes/people'
import songRoutes from './routes/song'
import userRoutes from './routes/user'
import optionRoutes from './routes/options'

// Auth routes here

// Configure application
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

app.use('/api/services', serviceRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/users', userRoutes)
app.use('/api/options', optionRoutes)

app.listen(PORT, () => `Server listening on port: ${PORT}`)