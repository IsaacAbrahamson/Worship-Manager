import { EventTypesInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  types: EventTypesInterface[],
  small?: boolean
}

export default function EventTypesTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.types.map((type: EventTypesInterface) => {
      return (
        <tr key={type._id}>
          <td>{type.type}</td>
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
        <input type="text" placeholder="Enter new event..." />
        <button><PlusIcon /> Add Event</button>
      </div>
    </div>
  )
}