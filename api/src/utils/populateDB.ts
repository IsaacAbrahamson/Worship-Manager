import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB, closeDB } from './connectDB'
import createData from './createData'
import User from '../models/User'
dotenv.config()

main()

async function main() {
  console.log('Creating database connection...')
  const conn = await connectDB()

  await dropCollections()

  console.log('creating user...')
  const user = new User({
    email: 'testuser@example.com',
    first_name: 'Test',
    last_name: 'User',
    password: 'test123'
  })
  await user.save()

  await createData(user._id)

  console.log('Closing database connection...')
  await closeDB(conn)
}

async function dropCollections() {
  try {
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    const names: string[] = collections.map((collection) => collection.name)
    for (let name of names) {
      await db.dropCollection(name)
      console.log('Dropped collection: ' + name)
    }
  } catch (err) {
    console.log(err)
  }
}