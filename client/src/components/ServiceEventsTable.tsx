import { EventInterface } from "../types"
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  events: EventInterface[],
  small?: boolean
}

export default function ServiceEventsTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.events.map((event: EventInterface) => {
      return (
        <tr key={event._id}>
          <td>{event.type.type}</td>
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
            <th>Event</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <select name="personSelect">
          <option value="" selected>Choose event...</option>
        </select>
        <button><PlusIcon /> Add Event</button>
      </div>
    </div>
  )
}