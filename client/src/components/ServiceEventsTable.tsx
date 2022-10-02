import { EventInterface } from "../types"
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  events: EventInterface[]
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
    <div className="table-wrapper">
      <table>
        <tbody>
          <tr>
            <th>Event</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
    </div>
  )
}