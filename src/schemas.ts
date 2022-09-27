interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  password: string
}

interface Service {
  id: number
  date: Date
  theme: string
  typeId: number
  events: Event[]
  people: Person[]
}

interface ServiceType {
  id: number
  type: string
}

interface Event {
  id: number
  order: number
  serviceId: number
  eventTypeId: number
  songId?: number
}

interface EventType {
  id: number
  type: string
}

interface Songs {
  id: number
  name: string
  page?: number
  last_used?: number
}

interface Person {
  id: number
  first_name: string
  last_name: string
  email: string
}