import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import connectDB from './utils/connectDB'
import Service from './models/Service'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', async (req: Request, res: Response) => {
  await connectDB()
  const service = new Service({
    theme: 'test theme'
  })
  await service.save()
  res.json({ service })
})

app.listen(PORT, () => `Server listening on port: ${PORT}`)