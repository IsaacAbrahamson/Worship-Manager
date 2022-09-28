import { Schema, model } from 'mongoose'

interface IServiceEventType {
  type: string
}

const serviceEventTypeSchema = new Schema<IServiceEventType>({
  type: { type: String, required: true },
})

const ServiceEventType = model('ServiceEventType', serviceEventTypeSchema)
export default ServiceEventType