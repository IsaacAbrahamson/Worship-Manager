import { Schema, model } from 'mongoose'

interface IUser {
  email: string
  first_name: string
  last_name: string
  password: string
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
})

const User = model('User', userSchema)
export default User