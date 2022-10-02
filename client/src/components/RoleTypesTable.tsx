import { RoleTypesInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  roles: RoleTypesInterface[],
  small?: boolean
}

export default function RoleTypesTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.roles.map((role: RoleTypesInterface) => {
      return (
        <tr key={role._id}>
          <td>{role.role}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Delete />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  return (
    <div className={props.small ? 'table-wrapper table-wrapper-small' : 'table-wrapper'}>
      <table>
        <tbody>
          <tr>
            <th>Type</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <input type="text" placeholder="Enter new role..." />
        <button><PlusIcon /> Add Role</button>
      </div>
    </div>
  )
}