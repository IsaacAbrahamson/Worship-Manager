import { RoleTypesInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  roles: RoleTypesInterface[]
}

export default function RoleTypesTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.roles.map((role: RoleTypesInterface) => {
      return (
        <tr key={role._id}>
          <td>{role.role}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Edit />
              <Delete />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  return (
    <div className="table-wrapper">
      <table>
        <tbody>
          <tr>
            <th>Type</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
    </div>
  )
}