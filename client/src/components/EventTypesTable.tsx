import { EventTypesInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import UserContext from '../UserContext'
import { useContext, useState } from "react"

interface Props {
  types: EventTypesInterface[]
  setEventTypes: React.Dispatch<React.SetStateAction<EventTypesInterface[] | undefined>>
  small?: boolean
}

export default function EventTypesTable(props: Props) {
  const { user } = useContext(UserContext)
  const [typeInput, setTypeInput] = useState<string>('')

  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.types.map((type: EventTypesInterface) => {
      return (
        <tr key={type._id}>
          <td>{type.type}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Delete onClick={() => deleteType(type._id)} />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  async function submitType(e: React.FormEvent) {
    e.preventDefault()
    if (typeInput === '') return

    const res = await fetch('/api/options/events/new', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: typeInput, userId: user?._id })
    })

    if (res.status === 200) {
      const newType: EventTypesInterface = await res.json()
      props.setEventTypes(prev => {
        return [...prev!, newType]
      })
    } else {
      alert('Could not add type!')
    }

    setTypeInput('')
  }

  async function deleteType(id: string) {
    const res = await fetch('/api/options/events/delete', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    if (res.status === 200) {
      props.setEventTypes(prev => prev?.filter(e => e._id !== id))
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
            <th>Type</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <form onSubmit={submitType}>
          <input type="text" name="role" placeholder="Enter new event..." value={typeInput} onChange={(e) => setTypeInput(e.target.value)} />
          <button><PlusIcon /> Add event</button>
        </form>
      </div>
    </div>
  )
}