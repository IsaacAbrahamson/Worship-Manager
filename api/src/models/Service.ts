import { Schema, Types, model } from 'mongoose'

interface IServiceEvent {
  type: Types.ObjectId
  order: number
  song?: Types.ObjectId
}

interface IPeople {
  person: Types.ObjectId
  role: Types.ObjectId
}

interface IService {
  date: Date
  theme: string
  type: Types.ObjectId
  people: Types.ObjectId
  events: IServiceEvent
  userId: Types.ObjectId
}

const serviceEventSchema = new Schema<IServiceEvent>({
  type: { type: Schema.Types.ObjectId, ref: 'ServiceEventType' },
  order: { type: Number, required: true },
  song: { type: Schema.Types.ObjectId, ref: 'Song' }
})

const peopleSchema = new Schema<IPeople>({
  person: { type: Schema.Types.ObjectId, ref: 'Person' },
  role: { type: Schema.Types.ObjectId, ref: 'ServiceRole' }
})

const serviceSchema = new Schema<IService>({
  date: { type: Date, default: Date.now },
  theme: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: 'ServiceType' },
  people: [peopleSchema],
  events: [serviceEventSchema],
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Service = model('Service', serviceSchema)
export default Service
