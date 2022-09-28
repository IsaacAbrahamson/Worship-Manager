import { Schema, model } from 'mongoose'

interface IServiceType {
  type: string
}

const serviceTypeSchema = new Schema<IServiceType>({
  type: { type: String, required: true },
})

const ServiceType = model('ServiceType', serviceTypeSchema)
export default ServiceType