import express, { Request, Response } from 'express'
import Service from '../models/Service'
import ServiceEventType from '../models/ServiceEventType'
import ServiceRole from '../models/ServiceRole'
import ServiceType from '../models/ServiceType'
import randomColor from 'randomcolor'
const router = express.Router()

// Event Type Routes
router.get('/events', async (req: Request, res: Response) => {
  const types = await ServiceEventType.find({})
  res.send(types)
})

router.post('/events/new', async (req: Request, res: Response) => {
  const type = new ServiceEventType({ type: req.body.type })
  try {
    const newType = await type.save()
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
  const roles = await ServiceRole.find({})
  res.send(roles)
})

router.post('/roles/new', async (req: Request, res: Response) => {
  const role = new ServiceRole({ role: req.body.role })
  try {
    const newRole = await role.save()
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
  const types = await ServiceType.find({})
  res.send(types)
})

router.post('/types/new', async (req: Request, res: Response) => {
  const background: string = randomColor()

  const type = new ServiceType({
    type: req.body.type,
    color: getContrast(hexToRgb(background)),
    background
  })
  try {
    const newType = await type.save()
    res.send(newType)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
})

router.post('/types/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
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
    await ServiceEventType.deleteOne({ _id })
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