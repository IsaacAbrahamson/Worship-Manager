import express, { Request, Response } from 'express'
import Song from '../models/Song'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { userId } = req.query
  const songs = await Song.find({ userId })
  res.send(songs)
})

router.post('/new', async (req: Request, res: Response) => {
  const { name, page, last_used, userId } = req.body

  try {
    const newSong = new Song({ name, page, last_used, userId })
    await newSong.save()
    res.send(newSong)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
})

router.post('/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})



export default router