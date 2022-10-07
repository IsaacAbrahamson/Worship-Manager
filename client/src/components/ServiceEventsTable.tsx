import { EventInterface, EventTypesInterface } from "../types"
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import UserContext from '../UserContext'
import { useContext, useEffect, useState } from "react"

interface Props {
  events: EventInterface[],
  small?: boolean
}

export default function ServiceEventsTable(props: Props) {
  const { user } = useContext(UserContext)
  const [selectedEvent, setSelectedEvent] = useState('')
  const [availableEvents, setAvailableEvents] = useState<EventTypesInterface[]>()

  useEffect(() => {
    getEvents()
  }, [])

  async function getEvents() {
    const res = await fetch(`/api/options/events?userId=${user?._id}`)
    const events = await res.json()
    setAvailableEvents(events)
  }

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
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
          <option disabled={true} value="">Choose event</option>
          {availableEvents && availableEvents.map(e => <option value={e._id} key={e._id}>{e.type}</option>)}
        </select>
        <button><PlusIcon /> Add Event</button>
      </div>
    </div>
  )
}