import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB, closeDB } from './connectDB'
import createData from './createData'
import User from '../models/User'
import bcrypt from 'bcrypt'

dotenv.config()
main()

// Creates a clean database with test user and data
async function main() {
  // Connect to database
  console.log('Creating database connection...')
  const conn = await connectDB()

  // Drop all collections
  console.log('Dropping database collections...')
  await dropCollections()

  // Create test user
  console.log('Creating test user...')
  const hashedPassword = await bcrypt.hash('test123', 10)
  const user = new User({
    email: 'testuser@example.com',
    first_name: 'Test',
    last_name: 'User',
    password: hashedPassword
  })
  await user.save()

  // Create test data for user
  await createData(user._id)

  // Close database connection
  console.log('Closing database connection...')
  await closeDB(conn)
}



// Utility function to iterate over all collections in database and drop them
async function dropCollections() {
  try {
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    const names: string[] = collections.map((collection) => collection.name)
    for (let name of names) {
      await db.dropCollection(name)
    }
  } catch (err) {
    console.log(err)
  }
}