import { UserInterface } from "../types"

interface Props {
  user: UserInterface
}

export default function Options(props: Props) {
  return (
    <div>
      People page for User: {props.user ? props.user.email : 'no loged in'}
    </div>
  )
}