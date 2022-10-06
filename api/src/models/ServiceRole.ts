import { Schema, model, Types } from 'mongoose'

interface IServiceRole {
  role: string
  userId: Types.ObjectId
}

const serviceRoleSchema = new Schema<IServiceRole>({
  role: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const ServiceRole = model('ServiceRole', serviceRoleSchema)
export default ServiceRole