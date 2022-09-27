import { Schema, Types, model } from 'mongoose'

interface IServiceEvent {
  type: string
  song?: Types.ObjectId
}

interface IService {
  date: Date
  theme: string
  people: Types.ObjectId
  events: IServiceEvent
}

const serviceEvent = new Schema<IServiceEvent>({
  type: { type: String, required: true },
  song: { type: Schema.Types.ObjectId, ref: 'Song' }
})

const serviceSchema = new Schema<IService>({
  date: { type: Date, default: Date.now },
  theme: { type: String, required: true },
  people: { type: Schema.Types.ObjectId, ref: 'Person' },
  events: [serviceEvent]
})

const Service = model('Service', serviceSchema)
export default Service
