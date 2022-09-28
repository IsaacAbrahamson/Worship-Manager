import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  res.send('all services')
})

router.get('/:id', async (req: Request, res: Response) => {
  res.send('service: ' + req.params.id)
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