import express, { Request, Response } from 'express'
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
  res.send('type: ' + req.body.type)
})

router.post('/roles/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/roles/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
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