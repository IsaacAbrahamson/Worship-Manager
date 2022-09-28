import { Schema, Types, model } from 'mongoose'

interface IPerson {
  first_name: string
  last_name: string
  email: string
  userId: Types.ObjectId
}

const personSchema = new Schema<IPerson>({
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Person = model('Person', personSchema)
export default Person