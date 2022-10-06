import express, { Request, Response } from 'express'
import Person from '../models/Person'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { userId } = req.query
  const people = await Person.find({ userId })
  res.send(people)
})

router.post('/new', async (req: Request, res: Response) => {
  res.send('first_name: ' + req.body.first_name)
})

router.post('/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})



export default router