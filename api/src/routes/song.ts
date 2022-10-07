import express, { Request, Response } from 'express'
import Service from '../models/Service'
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
  const { _id, name, page, last_used } = req.body

  // Make sure all needed parameters are present
  if (!name) {
    return res.status(400).send('Missing required parameter')
  }

  try {
    await Song.findByIdAndUpdate(_id, { name, page, last_used })
    res.send({ _id, name, page, last_used })
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    else message = 'An unknown error occured'
    res.status(400).send(message)
  }
})

router.post('/delete', async (req: Request, res: Response) => {
  const _id: string = req.body.id

  // Do not delete if a service uses that person
  const existing = await Service
    .findOne({
      events: {
        $elemMatch: { song: _id }
      }
    })
  if (existing) {
    return res.status(400).send('Cannot delete song that is currently assigned to a service. Please delete any services using this song first.')
  }

  // Delete person
  try {
    await Song.deleteOne({ _id })
    res.send('Success')
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    else message = 'An unknown error occured'
    res.status(400).send(message)
  }
})



export default router