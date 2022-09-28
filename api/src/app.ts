import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// test route. remove this and add populate to new user route once created
app.get('/', async (req: Request, res: Response) => {
  res.send('hi')
})

app.listen(PORT, () => `Server listening on port: ${PORT}`)