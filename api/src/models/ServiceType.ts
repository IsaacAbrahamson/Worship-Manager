import { Schema, model, Types } from 'mongoose'

interface IServiceType {
  type: string
  color: string
  background: string
  userId: Types.ObjectId
}

const serviceTypeSchema = new Schema<IServiceType>({
  type: { type: String, required: true },
  color: { type: String, required: true },
  background: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const ServiceType = model('ServiceType', serviceTypeSchema)
export default ServiceType