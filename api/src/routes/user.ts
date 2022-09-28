import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
  res.send('user info: ' + req.params.id)
})

router.post('/new', async (req: Request, res: Response) => {
  res.send('name: ' + req.body.name)
})

router.post('/update', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})

router.post('/delete', async (req: Request, res: Response) => {
  res.send('id: ' + req.body.id)
})



export default router