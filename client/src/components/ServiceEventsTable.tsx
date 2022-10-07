import { EventInterface, EventTypesInterface, ServiceInterface, SongInterface } from "../types"
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import UserContext from '../UserContext'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface Props {
  small?: boolean
  id: string
}

export default function ServiceEventsTable(props: Props) {
  const { user } = useContext(UserContext)
  const [events, setEvents] = useState<EventInterface[]>()
  const [selectedEvent, setSelectedEvent] = useState('')
  const [availableEvents, setAvailableEvents] = useState<EventTypesInterface[]>()
  const [selectedSong, setSelectedSong] = useState('')
  const [availableSongs, setAvailableSongs] = useState<SongInterface[]>()

  useEffect(() => {
    getEvents()
    getAvailableEvents()
    getAvailableSongs()
  }, [])

  async function getEvents() {
    const res = await fetch(`/api/services/${props.id}/events`)
    const events = await res.json()
    setEvents(events)
  }

  async function getAvailableEvents() {
    const res = await fetch(`/api/options/events?userId=${user?._id}`)
    const events = await res.json()
    setAvailableEvents(events)
  }

  async function getAvailableSongs() {
    const res = await fetch(`/api/songs?userId=${user?._id}`)
    const songs = await res.json()
    setAvailableSongs(songs)
  }

  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = events!.map((event: EventInterface) => {
      return (
        <tr key={event._id}>
          <td>{event.type.type} {event.song ? <span>({event.song.name})</span> : ''}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Delete onClick={() => deleteEvent(event._id)} />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  async function addEvent() {
    if (!selectedEvent) return

    const res = await fetch(`/api/services/${props.id}/new/event`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: selectedEvent,
        song: selectedSong ? selectedSong : null
      })
    })

    if (res.status === 200) {
      await res.json() as ServiceInterface
      getEvents()
    } else {
      alert('Could not add event')
    }
  }

  async function deleteEvent(eventId: string) {
    const res = await fetch(`/api/services/${props.id}/delete/event`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId })
    })

    if (res.status === 200) {
      setEvents(prev => prev?.filter(e => e._id !== eventId))
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  return (
    <div className={props.small ? 'table-wrapper table-wrapper-small' : 'table-wrapper'}>
      <table>
        <tbody>
          <tr>
            <th>Event</th>
            <th></th>
          </tr>
          {events && createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
          <option disabled={true} value="">Choose event</option>
          {availableEvents && availableEvents.map(e => <option value={e._id} key={e._id}>{e.type}</option>)}
        </select>
        <select value={selectedSong} onChange={(e) => setSelectedSong(e.target.value)}>
          <option value="">No song</option>
          {availableSongs && availableSongs.map(e => <option value={e._id} key={e._id}>{e.name}</option>)}
        </select>
        <button onClick={addEvent}><PlusIcon /> Add Event</button>
      </div>
    </div>
  )
}