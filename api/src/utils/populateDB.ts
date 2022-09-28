import * as dotenv from 'dotenv'
import { connectDB, closeDB } from './connectDB'
import createData from './createData'
import User from '../models/User'
dotenv.config()

main()

async function main() {
  console.log('Creating database connection...')
  const conn = await connectDB()

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