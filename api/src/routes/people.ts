import express, { Request, Response } from 'express'
import Person from '../models/Person'
import Service from '../models/Service'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { userId } = req.query
  const people = await Person.find({ userId })
  res.send(people)
})

router.post('/new', async (req: Request, res: Response) => {
  const { first_name, last_name, email, userId } = req.body

  try {
    const newPerson = new Person({ first_name, last_name, email, userId })
    await newPerson.save()
    res.send(newPerson)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
})

router.post('/update', async (req: Request, res: Response) => {
  const { _id, first_name, last_name, email } = req.body

  // Make sure all update parameters are present
  if (!first_name || !last_name || !email) {
    return res.status(400).send('Missing required parameter')
  }

  try {
    await Person.findByIdAndUpdate(_id, { first_name, last_name, email })
    res.send({ _id, first_name, last_name, email })
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
      people: {
        $elemMatch: { person: _id }
      }
    })
  if (existing) {
    return res.status(400).send('Cannot delete person that is currently assigned to a service. Please delete any services using this person first.')
  }

  // Delete person
  try {
    await Person.deleteOne({ _id })
    res.send('Success')
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    else message = 'An unknown error occured'
    res.status(400).send(message)
  }
})



export default router