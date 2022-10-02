import { ServiceTypeInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  types: ServiceTypeInterface[]
}

export default function ServiceTypesTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.types.map((type: ServiceTypeInterface) => {
      return (
        <tr key={type._id}>
          <td>
            <div className="colored-circle" style={{ background: type.color }}></div>
            {type.color}
          </td>
          <td>
            <div className="colored-circle" style={{ background: type.background }}></div>
            {type.background}
          </td>
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
            <th>Color</th>
            <th>Background</th>
            <th>Type</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
    </div>
  )
}