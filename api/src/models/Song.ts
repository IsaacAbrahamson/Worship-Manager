import { Schema, Types, model } from 'mongoose'

interface ISong {
  name: string
  page?: number
  last_used?: Date
  userId: Types.ObjectId
}

const songSchema = new Schema<ISong>({
  name: { type: String, required: true },
  page: { type: Number },
  last_used: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Song = model('Song', songSchema)
export default Song