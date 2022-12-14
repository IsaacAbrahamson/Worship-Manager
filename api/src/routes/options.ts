import express, { Request, Response } from 'express'
import Service from '../models/Service'
import ServiceEventType from '../models/ServiceEventType'
import ServiceRole from '../models/ServiceRole'
import ServiceType from '../models/ServiceType'
import randomColor from 'randomcolor'
const router = express.Router()

// Event Type Routes
router.get('/events', async (req: Request, res: Response) => {
  const { userId } = req.query
  const types = await ServiceEventType.find({ userId })
  res.send(types)
})

router.post('/events/new', async (req: Request, res: Response) => {
  const { type, userId } = req.body

  try {
    const newType = new ServiceEventType({ type, userId })
    await newType.save()
    res.send(newType)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
})

router.post('/events/delete', async (req: Request, res: Response) => {
  const _id: string = req.body.id

  // Do not delete role if a service uses that event
  const existing = await Service
    .findOne({
      events: {
        $elemMatch: { type: _id }
      }
    })
  if (existing) {
    return res.status(400).send('Cannot delete event type that is currently assigned to a service. Please delete any uses of this event first.')
  }

  // Delete role
  try {
    await ServiceEventType.deleteOne({ _id })
    res.send('Success')
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    else message = 'An unknown error occured'
    res.status(400).send(message)
  }
})



// Role Type Routes
router.get('/roles', async (req: Request, res: Response) => {
  const { userId } = req.query
  const roles = await ServiceRole.find({ userId })
  res.send(roles)
})

router.post('/roles/new', async (req: Request, res: Response) => {
  const { role, userId } = req.body

  try {
    const newRole = new ServiceRole({ role, userId })
    await newRole.save()
    res.send(newRole)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
})

router.post('/roles/delete', async (req: Request, res: Response) => {
  const _id: string = req.body.id

  // Do not delete role if a service uses that role
  const existing = await Service
    .findOne({
      people: {
        $elemMatch: { role: _id }
      }
    })
  if (existing) {
    return res.status(400).send('Cannot delete role that is currently assigned to a service. Please delete any uses of this role first.')
  }

  // Delete role
  try {
    await ServiceRole.deleteOne({ _id })
    res.send('Success')
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    else message = 'An unknown error occured'
    res.status(400).send(message)
  }
})



// Service Type Routes
router.get('/types', async (req: Request, res: Response) => {
  const { userId } = req.query
  const types = await ServiceType.find({ userId })
  res.send(types)
})

router.post('/types/new', async (req: Request, res: Response) => {
  const { type, userId } = req.body
  const background: string = randomColor()

  try {
    const newType = new ServiceType({
      type,
      color: getContrast(hexToRgb(background)),
      background,
      userId
    })
    await newType.save()
    res.send(newType)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
})

router.post('/types/update', async (req: Request, res: Response) => {
  const { _id, type, color, background } = req.body

  // Make sure all update parameters are present
  if (!type || !color || !background) {
    return res.status(400).send('Missing required parameter')
  }

  try {
    await ServiceType.findByIdAndUpdate(_id, { type, color, background })
    res.send({ _id, type, color, background })
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    else message = 'An unknown error occured'
    res.status(400).send(message)
  }
})

router.post('/types/delete', async (req: Request, res: Response) => {
  const _id: string = req.body.id

  // Do not delete role if a service uses that event
  const existing = await Service.findOne({ type: _id })
  if (existing) {
    return res.status(400).send('Cannot delete service type that is currently assigned to a service. Please delete any uses of this service type first.')
  }

  // Delete role
  try {
    await ServiceType.deleteOne({ _id })
    res.send('Success')
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    else message = 'An unknown error occured'
    res.status(400).send(message)
  }
})



type rgbType = [number, number, number]

function hexToRgb(hex: string): rgbType {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0]
}

// gets text color for background
function getContrast(rgb: rgbType) {
  const brightness = Math.round((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000
  return (brightness > 125) ? '#000000' : '#FFFFFF'
}



export default router