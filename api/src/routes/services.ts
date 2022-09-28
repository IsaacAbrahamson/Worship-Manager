import express, { Request, Response } from 'express'
import Service from '../models/Service'
import ServiceType from '../models/ServiceType'
import Person from '../models/Person'
import ServiceRole from '../models/ServiceRole'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const services = await Service.find({})
  res.send(services)
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const service = await Service.findById(id)
      .populate({ path: 'type', select: 'type', model: ServiceType })
      .populate({ path: 'people', populate: { path: 'person', model: Person } })
      .populate({ path: 'people', populate: { path: 'role', select: 'role', model: ServiceRole } })
    res.send(service)
  } catch (err) {
    console.log(err)
    res.send({ status: 'invalid query', err })
  }
})

router.post('/new', async (req: Request, res: Response) => {
  res.send('theme: ' + req.body.theme)
})

router.post('/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

export default router