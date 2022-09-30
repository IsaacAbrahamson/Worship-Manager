export interface UserInterface {
  email: string
  first_name: string
  last_name: string
}

export enum AuthStatus {
  Unauthorized,
  Authorized
}

export interface ContextInterface {
  isLoaded: boolean
  user: Partial<UserInterface>
}