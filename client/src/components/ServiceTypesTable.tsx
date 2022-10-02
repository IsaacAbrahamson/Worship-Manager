import { ServiceTypeInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  types: ServiceTypeInterface[],
  small?: boolean
}

export default function ServiceTypesTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.types.map((type: ServiceTypeInterface) => {
      return (
        <tr key={type._id}>
          <td>{type.type}</td>
          <td>
            <div className="colored-circle" style={{ background: type.color }}></div>
            {type.color}
          </td>
          <td>
            <div className="colored-circle" style={{ background: type.background }}></div>
            {type.background}
          </td>
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
    <div className={props.small ? 'table-wrapper table-wrapper-small' : 'table-wrapper'}>
      <table>
        <tbody>
          <tr>
            <th>Type</th>
            <th>Color</th>
            <th>Background</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <input type="text" placeholder="Enter new service type..." />
        <button><PlusIcon /> Add Service Type</button>
      </div>
    </div>
  )
}