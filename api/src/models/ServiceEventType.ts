import { Schema, model, Types } from 'mongoose'

interface IServiceEventType {
  type: string
  userId: Types.ObjectId
}

const serviceEventTypeSchema = new Schema<IServiceEventType>({
  type: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const ServiceEventType = model('ServiceEventType', serviceEventTypeSchema)
export default ServiceEventType