export interface UserInterface {
  email: string
  first_name: string
  last_name: string
}

export interface ContextInterface {
  user: UserInterface | undefined
  updateUser(newUser: UserInterface): void
  logoutUser(): void
}

export interface PersonInterface {
  _id: string
  email: string
  first_name: string
  last_name: string
}

export interface ServiceTypeInterface {
  type: string
  color: string
  background: string
}

export interface EventInterface {
  _id: string
  type: string
  order: number
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