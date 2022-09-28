import { connect, Connection } from "mongoose";

type Database = Connection | undefined

export async function connectDB(): Promise<Database> {
  if (!process.env.DB_STRING) throw new Error('No database specified in environment')

  try {
    const db = await connect(process.env.DB_STRING, { dbName: 'worshipdb' })
    return db.connection
  } catch (e) {
    console.log(e)
  }
}

export async function closeDB(connection: Database): Promise<void> {
  if (connection) connection.close()
}