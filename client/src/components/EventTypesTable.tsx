import { EventTypesInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  types: EventTypesInterface[]
}

export default function EventTypesTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.types.map((type: EventTypesInterface) => {
      return (
        <tr key={type._id}>
          <td>{type.type}</td>
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