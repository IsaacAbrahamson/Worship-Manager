export interface UserInterface {
  _id?: string
  email: string
  first_name: string
  last_name: string
}

export interface ContextInterface {
  user: UserInterface | undefined
  updateUser(newUser: UserInterface): void
  logoutUser(): void
}

export interface SongInterface {
  _id: string
  name: string
  page?: number
  last_used?: string
}

export interface PersonInterface {
  _id: string
  email: string
  first_name: string
  last_name: string
}

export interface EventInterface {
  _id: string
  type: EventTypesInterface
  order: number
  song?: SongInterface
}

export interface ServiceInterface {
  _id: string
  date: string
  theme: string
  type: ServiceTypeInterface
  people: {
    role: { role: string },
    person: PersonInterface
  }[]
  events: EventInterface[]
}

export interface ServiceTypeInterface {
  _id: string
  type: string
  color: string
  background: string
}

export interface EventTypesInterface {
  _id: string
  type: string
}

export interface RoleTypesInterface {
  _id: string
  role: string
}