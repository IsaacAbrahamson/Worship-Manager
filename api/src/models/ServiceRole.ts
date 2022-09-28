import { Schema, model } from 'mongoose'

interface IServiceRole {
  role: string
}

const serviceRoleSchema = new Schema<IServiceRole>({
  role: { type: String, required: true },
})

const ServiceRole = model('ServiceRole', serviceRoleSchema)
export default ServiceRole