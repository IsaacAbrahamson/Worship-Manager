import { Schema, model } from 'mongoose'

interface IServiceType {
  type: string
  color: string
  background: string
}

const serviceTypeSchema = new Schema<IServiceType>({
  type: { type: String, required: true },
  color: { type: String, required: true },
  background: { type: String, required: true },
})

const ServiceType = model('ServiceType', serviceTypeSchema)
export default ServiceType