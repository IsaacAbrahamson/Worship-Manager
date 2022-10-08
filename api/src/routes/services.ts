import express, { Request, Response } from 'express'
import Service from '../models/Service'
import ServiceType from '../models/ServiceType'
import Person from '../models/Person'
import ServiceRole from '../models/ServiceRole'
import Song from '../models/Song'
import ServiceEventType from '../models/ServiceEventType'
const router = express.Router()

router.get('/upcoming', async (req: Request, res: Response) => {
  const { userId } = req.query
  const services = await Service.find({ userId, date: { $gte: new Date() } })
    .populate({ path: 'type', model: ServiceType })
  res.send(services)
})

router.get('/past', async (req: Request, res: Response) => {
  const { userId } = req.query
  const services = await Service.find({ userId, date: { $lte: new Date() } })
    .populate({ path: 'type', model: ServiceType })
  res.send(services)
})

router.post('/new', async (req: Request, res: Response) => {
  const { datetime, theme, type, userId } = req.body
  if (!datetime || !theme || !type || !userId) return res.status(400).send('missing required parameter')
  const date: Date = new Date(datetime as string)

  try {
    const service = new Service({
      date,
      theme,
      type,
      people: [],
      events: [],
      userId
    })
    await service.save()

    // find it to get full populate info
    const newService = await Service.findById(service._id)
      .populate({ path: 'type', model: ServiceType })

    res.send(newService)
  } catch (err) {
    res.status(400).send('Could not create service')
  }
})



// Service Detail
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const service = await Service.findById(id)
      .populate({ path: 'type', model: ServiceType })
    res.send(service)
  } catch (err) {
    console.log(err)
    res.send({ status: 'invalid query', err })
  }
})

router.post('/:id/update', async (req: Request, res: Response) => {
  const id = req.params.id
  const { date, type, theme } = req.body

  if (!date || !type || !theme) return res.status(400).send('Missing required parameter')

  try {
    await Service.findByIdAndUpdate(id, { date, type, theme })
    res.send('success')
  } catch (err) {
    console.log(err)
    res.send('An error occurred')
  }
})

router.post('/:id/delete', async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    await Service.findByIdAndDelete(id)
    res.send('success')
  } catch (err) {
    console.log(err)
    res.send('An error occurred')
  }
})



// Service Events
router.get('/:id/events', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const service = await Service.findById(id)
      .populate({ path: 'events', populate: { path: 'type', model: ServiceEventType } })
      .populate({ path: 'events', populate: { path: 'song', model: Song } })
    res.send(service ? service.events : null)
  } catch (err) {
    console.log(err)
    res.send({ status: 'invalid query', err })
  }
})

router.post('/:id/new/event', async (req: Request, res: Response) => {
  const id = req.params.id
  const { type, song } = req.body

  // Ensure required parameters
  if (!type) return res.status(400).send('Missing required parameter')

  const event = {
    type,
    song,
    order: 0
  }

  try {
    await Service.findByIdAndUpdate(id, { $push: { events: event } })
    res.send('Success')
  } catch (err) {
    res.status(400).send('Could not add event')
  }
})

router.post('/:id/delete/event', async (req: Request, res: Response) => {
  const id = req.params.id
  const { eventId } = req.body

  try {
    await Service.findByIdAndUpdate(id, { $pull: { events: { _id: eventId } } })
    res.send('success')
  } catch (err) {
    res.status(400).send('Could not delete event')
  }
})



// Service People
router.get('/:id/people', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const service = await Service.findById(id)
      .populate({ path: 'people', populate: { path: 'person', model: Person } })
      .populate({ path: 'people', populate: { path: 'role', select: 'role', model: ServiceRole } })
    res.send(service ? service.people : null)
  } catch (err) {
    console.log(err)
    res.send({ status: 'invalid query', err })
  }
})

router.post('/:id/new/person', async (req: Request, res: Response) => {
  const id = req.params.id
  const { personId, roleId } = req.body

  // Ensure required parameters
  if (!personId || !roleId) return res.status(400).send('Missing required parameter')

  const person = {
    person: personId,
    role: roleId
  }

  try {
    await Service.findByIdAndUpdate(id, { $push: { people: person } })
    res.send('Success')
  } catch (err) {
    res.status(400).send('Could not add person')
  }
})

router.post('/:id/delete/person', async (req: Request, res: Response) => {
  const id = req.params.id
  const { personId } = req.body

  try {
    await Service.findByIdAndUpdate(id, { $pull: { people: { _id: personId } } })
    res.send('success')
  } catch (err) {
    res.status(400).send('Could not delete event')
  }
})

export default router