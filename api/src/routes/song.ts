import express, { Request, Response } from 'express'
import Song from '../models/Song'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { userId } = req.query
  const songs = await Song.find({ userId })
  res.send(songs)
})

router.post('/new', async (req: Request, res: Response) => {
  res.send('name: ' + req.body.name)
})

router.post('/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})



export default router