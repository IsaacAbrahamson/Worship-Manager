import { connect } from "mongoose";

async function connectDB(): Promise<void> {
  if (!process.env.DB_STRING) throw new Error('No database specified in environment')

  try {
    await connect(process.env.DB_STRING, { dbName: 'worshipdb' })
  } catch (e) {
    console.log(e)
  }
}

export default connectDB