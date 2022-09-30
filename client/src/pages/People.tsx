import { UserInterface } from "../types"
import Sidebar from '../components/Sidebar'

interface Props {
  user: UserInterface
}

export default function Options(props: Props) {
  return (
    <div>
      People page for User: {props.user.email}
      <Sidebar />
    </div>
  )
}