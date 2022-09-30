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