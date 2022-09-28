import express, { Request, Response } from 'express'
const router = express.Router()

// Event Type Routes
router.get('/events', async (req: Request, res: Response) => {
  res.send('all event types info: ')
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
  res.send('all role types info: ')
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
  res.send('all service types info: ')
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