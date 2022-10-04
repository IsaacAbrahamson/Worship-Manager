import express, { Request, Response } from 'express'
import Service from '../models/Service'
import ServiceEventType from '../models/ServiceEventType'
import ServiceRole from '../models/ServiceRole'
import ServiceType from '../models/ServiceType'
const router = express.Router()

// Event Type Routes
router.get('/events', async (req: Request, res: Response) => {
  const types = await ServiceEventType.find({})
  res.send(types)
})

router.post('/events/new', async (req: Request, res: Response) => {
  res.send('type: ' + req.body.type)
})

router.post('/events/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/events/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
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
      'people': {
        $elemMatch: { 'role': _id }
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
  res.send('type: ' + req.body.type)
})

router.post('/types/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/types/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})



export default router